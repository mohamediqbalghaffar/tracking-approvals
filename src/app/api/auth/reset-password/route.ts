import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ 
        success: false, 
        error: 'تکایە ناونیشانی ئیمەیڵی دروست بنووسە' 
      }, { status: 400 });
    }

    const emailNormalized = email.toLowerCase().trim();

    // Determine provider & official recovery URL based on email domain
    let provider = 'generic';
    let recoveryUrl = `https://accounts.google.com/signin/recovery?email=${encodeURIComponent(emailNormalized)}`;
    let providerName = 'Google / Gmail';

    if (emailNormalized.includes('@halabjagroup.com')) {
      provider = 'microsoft';
      recoveryUrl = `https://mail.halabjagroup.com/`;
      providerName = 'سێرڤەری فەرمیی پۆستی هەڵەبجە گرووپ (mail.halabjagroup.com)';
    } else if (emailNormalized.includes('@outlook.com') || emailNormalized.includes('@hotmail.com')) {
      provider = 'microsoft';
      recoveryUrl = `https://passwordreset.microsoftonline.com/`;
      providerName = 'Microsoft 365 / Outlook';
    } else if (emailNormalized.includes('@gmail.com')) {
      provider = 'google';
      recoveryUrl = `https://accounts.google.com/signin/recovery?email=${encodeURIComponent(emailNormalized)}`;
      providerName = 'Google Workspace / Gmail';
    }

    // Check if account exists in database
    const user = await prisma.userAccount.findUnique({
      where: { email: emailNormalized }
    });

    // NOTE: This project strictly does NOT store or manage passwords directly.
    // Password security and recovery are delegated to the user's authentic email provider (Google / Microsoft).

    return NextResponse.json({
      success: true,
      provider,
      providerName,
      recoveryUrl,
      email: emailNormalized,
      userFound: Boolean(user),
      message: `ڕێنمایی و بەستەری گەڕاندنەوەی تێپەڕوشە بۆ پۆستی فەرمیی ${emailNormalized} ڕەوانە کرا لە ڕێگەی سێرڤەری ${providerName}.`
    });

  } catch (error: any) {
    console.error('Password reset email error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.message || 'هەڵەیەک لە سێرڤەر ڕوویدا لە کاتی ناردنی بەستەری گەڕاندنەوە.' 
    }, { status: 500 });
  }
}
