import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.userAccount.findUnique({
      where: { email: session.user.email },
      select: {
        odooUrl: true,
        odooDb: true,
        odooUsername: true,
        // Don't send the API key back for security, just a boolean indicator
        odooApiKey: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      odooUrl: user.odooUrl || '',
      odooDb: user.odooDb || '',
      odooUsername: user.odooUsername || '',
      hasApiKey: !!user.odooApiKey,
    });
  } catch (error) {
    console.error('Error fetching Odoo settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { odooUrl, odooDb, odooUsername, odooApiKey, disconnect } = body;

    if (disconnect) {
      await prisma.userAccount.update({
        where: { email: session.user.email },
        data: {
          odooUrl: null,
          odooDb: null,
          odooUsername: null,
          odooApiKey: null,
        },
      });
      return NextResponse.json({ success: true, disconnected: true });
    }

    const updateData: any = {
      odooUrl: odooUrl ? odooUrl.trim() : null,
      odooDb: odooDb ? odooDb.trim() : null,
      odooUsername: odooUsername ? odooUsername.trim() : null,
    };

    // Only update API key if it's provided (so we don't overwrite with empty if they only update other fields)
    if (odooApiKey) {
      updateData.odooApiKey = odooApiKey.trim();
    }

    await prisma.userAccount.update({
      where: { email: session.user.email },
      data: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving Odoo settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
