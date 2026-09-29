import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [received, sent, incoming, users, roles] = await Promise.all([
      prisma.receivedLetter.count(),
      prisma.sentLetter.count(),
      prisma.incomingLetter.count(),
      prisma.userAccount.count(),
      prisma.rolePermission.count(),
    ]);

    return NextResponse.json({
      success: true,
      provider: 'Supabase PostgreSQL',
      message: 'Database is healthy and connected to Supabase!',
      counts: {
        received,
        sent,
        incoming,
        users,
        roles,
      },
    });
  } catch (error: any) {
    console.error('Failed to verify Supabase DB:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
