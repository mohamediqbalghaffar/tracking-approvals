import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string | null;
    const image = formData.get('image') as File | null;
    const avatarPreset = formData.get('avatarPreset') as string | null;
    const removeImage = formData.get('removeImage') as string | null;

    const dataToUpdate: { name?: string; image?: string | null } = {};

    if (name) {
      dataToUpdate.name = name.trim();
    }

    if (removeImage === 'true') {
      dataToUpdate.image = null;
    } else if (avatarPreset) {
      dataToUpdate.image = avatarPreset;
    } else if (image && image.size > 0) {
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
          const blob = await put(`profiles/${session.user.email}-${Date.now()}-${image.name}`, image, {
            access: 'public',
          });
          dataToUpdate.image = blob.url;
        } catch (blobErr) {
          console.warn('Vercel Blob failed, falling back to data URL:', blobErr);
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          dataToUpdate.image = `data:${image.type || 'image/png'};base64,${buffer.toString('base64')}`;
        }
      } else {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        dataToUpdate.image = `data:${image.type || 'image/png'};base64,${buffer.toString('base64')}`;
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    const userEmail = session.user.email.toLowerCase();

    // Check if userAccount exists in Prisma, if not create or update
    const existingUser = await prisma.userAccount.findUnique({
      where: { email: userEmail }
    });

    let updatedUser;
    if (existingUser) {
      updatedUser = await prisma.userAccount.update({
        where: { email: userEmail },
        data: dataToUpdate,
      });
    } else {
      updatedUser = await prisma.userAccount.create({
        data: {
          email: userEmail,
          name: dataToUpdate.name || session.user.name || 'User',
          image: dataToUpdate.image,
          role: (session.user as any).role || 'admin',
          status: 'active',
        }
      });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        name: updatedUser.name,
        image: updatedUser.image,
      } 
    });

  } catch (error: any) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
