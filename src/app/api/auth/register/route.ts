import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyTOTP } from '@/lib/totp';

const ADMIN_EMAILS = [
  "mohammed.iqbal@halabjagroup.com",
  "moham_iqbal99@gmail.com",
  "admin@badwadachoon.local"
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, twoFactorSecret, totpCode } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ 
        success: false, 
        error: 'تکایە ناوی تەواو بنووسە' 
      }, { status: 400 });
    }

    if (!email || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ 
        success: false, 
        error: 'تکایە ناونیشانی ئیمەیڵی دروست بنووسە' 
      }, { status: 400 });
    }

    if (!password || password.trim().length < 6) {
      return NextResponse.json({ 
        success: false, 
        error: 'تێپەڕوشە دەبێت لانی کەم ٦ پیت یان ژمارە بێت' 
      }, { status: 400 });
    }

    // 2FA Verification
    if (!twoFactorSecret || !totpCode) {
      return NextResponse.json({ 
        success: false, 
        error: 'تکایە سەرەتا کۆدی Google Authenticator بە مۆبایلەکەت سکان بکە و کۆدی ٦ ژمارەیی بنووسە.' 
      }, { status: 400 });
    }

    const isTotpValid = verifyTOTP(twoFactorSecret, totpCode);
    if (!isTotpValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'کۆدی ٦ ژمارەیی Google Authenticator هەڵەیە یان بەسەرچووە. تکایە سەیری ئەپی Google Authenticator بکەرەوە.' 
      }, { status: 400 });
    }

    const emailNormalized = email.toLowerCase().trim();
    const nameTrimmed = name.trim();

    // Check if user already exists
    const existing = await prisma.userAccount.findUnique({
      where: { email: emailNormalized }
    });

    if (existing) {
      return NextResponse.json({ 
        success: false, 
        error: 'ئەم ئیمەیڵە پێشتر تۆمارکراوە. دەتوانیت لە بەشی چوونەژوورەوە بچیتە ژوورەوە.' 
      }, { status: 400 });
    }

    const isAdmin = ADMIN_EMAILS.includes(emailNormalized);

    // New non-admin users require admin approval ('pending' status)
    const newUser = await prisma.userAccount.create({
      data: {
        name: nameTrimmed,
        email: emailNormalized,
        role: isAdmin ? 'admin' : 'user',
        status: isAdmin ? 'active' : 'pending',
        authCode: password.trim(),
        twoFactorSecret: twoFactorSecret.trim(),
        twoFactorEnabled: true,
      }
    });

    return NextResponse.json({
      success: true,
      pendingApproval: !isAdmin,
      message: isAdmin 
        ? 'هەژماری بەڕێوەبەر بە سەرکەوتوویی دروستکرا.'
        : 'هەژمارەکەت و Google Authenticator بە سەرکەوتوویی بەسترانەوە! هەژمارەکەت ئێستا چاوەڕوانی پەسەندکردنی بەڕێوەبەری سەرەکییە (محمد اقبال غفار). دوای پەسەندکردن دەتوانیت بچیتە ژوورەوە.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      }
    });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'هەڵەیەک ڕوویدا لە دروستکردنی هەژمار. تکایە دووبارە هەوڵ بدەرەوە.' 
    }, { status: 500 });
  }
}
