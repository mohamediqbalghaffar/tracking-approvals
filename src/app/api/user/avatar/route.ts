import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email')?.toLowerCase()?.trim();

    if (!email) {
      return new NextResponse(null, { status: 404 });
    }

    const user = await prisma.userAccount.findUnique({
      where: { email },
      select: { image: true }
    });

    if (!user || !user.image) {
      return new NextResponse(null, { status: 404 });
    }

    // If it's a data URL, decode and serve as image binary
    if (user.image.startsWith('data:')) {
      const commaIdx = user.image.indexOf(',');
      if (commaIdx === -1) {
        return new NextResponse(null, { status: 404 });
      }

      const meta = user.image.substring(0, commaIdx);
      const base64Data = user.image.substring(commaIdx + 1);

      const mimeMatch = meta.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
      const imageBuffer = Buffer.from(base64Data, 'base64');

      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': mimeType,
          'Content-Length': imageBuffer.length.toString(),
          'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        },
      });
    }

    // If it's an external URL, redirect directly
    if (user.image.startsWith('http://') || user.image.startsWith('https://')) {
      return NextResponse.redirect(user.image);
    }

    return new NextResponse(null, { status: 404 });
  } catch (error) {
    console.error('Avatar fetch error:', error);
    return new NextResponse(null, { status: 500 });
  }
}
