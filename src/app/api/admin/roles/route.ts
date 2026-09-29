import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { syncTableToExcel } from '@/lib/excel-db';

const DEFAULT_ROLES = [
  { role: 'admin', permissions: '["data:edit","data:upload","users:manage","roles:manage","db:fetch","view:presentation","view:analytics"]' },
  { role: 'user', permissions: '["data:edit","db:fetch","view:presentation","view:analytics"]' },
  { role: 'viewer', permissions: '["db:fetch"]' },
  { role: 'guest', permissions: '["db:fetch"]' }
];

export async function GET() {
  try {
    const roles = await prisma.rolePermission.findMany();
    if (!roles || roles.length === 0) {
      return NextResponse.json({ roles: DEFAULT_ROLES });
    }
    return NextResponse.json({ roles });
  } catch (error: any) {
    return NextResponse.json({ roles: DEFAULT_ROLES });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as any)?.role;

    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, permissions } = await request.json();

    if (!role || !permissions) {
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    // Admin role must always have all permissions to prevent lockout
    let finalPermissions = permissions;
    if (role === 'admin') {
      finalPermissions = '["data:edit", "data:upload", "users:manage", "roles:manage", "db:fetch"]';
    }

    const updated = await prisma.rolePermission.upsert({
      where: { role },
      update: { permissions: finalPermissions },
      create: { role, permissions: finalPermissions },
    });

    // Sync to Desktop Excel
    syncTableToExcel('RolePermission').catch(console.error);

    return NextResponse.json({ success: true, role: updated });
  } catch (error: any) {
    console.error('Failed to update role:', error);
    return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
  }
}

