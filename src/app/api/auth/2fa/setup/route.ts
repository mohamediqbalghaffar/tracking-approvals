import { NextResponse } from 'next/server';
import { generateTOTPSecret, getOtpAuthUrl, generateQRCodeDataUrl } from '@/lib/totp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ 
        success: false, 
        error: 'تکایە ناونیشانی ئیمەیڵی دروست بنووسە' 
      }, { status: 400 });
    }

    const secret = generateTOTPSecret();
    const otpAuthUrl = getOtpAuthUrl(email.trim().toLowerCase(), secret, 'HTS Badwadachoon');
    const qrCode = await generateQRCodeDataUrl(otpAuthUrl);

    return NextResponse.json({
      success: true,
      secret,
      qrCode,
      otpAuthUrl,
    });
  } catch (error: any) {
    console.error('2FA Setup error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'هەڵەیەک ڕوویدا لە دروستکردنی کۆدی Google Authenticator' 
    }, { status: 500 });
  }
}
