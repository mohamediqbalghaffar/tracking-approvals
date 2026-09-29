import { NextResponse } from 'next/server';
import { verifyTOTP } from '@/lib/totp';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, code } = body;

    if (!secret || !code) {
      return NextResponse.json({ 
        success: false, 
        valid: false,
        error: 'کلیل و کۆدی ٦ ژمارەیی پێویستە' 
      }, { status: 400 });
    }

    const isValid = verifyTOTP(secret, code);

    if (!isValid) {
      return NextResponse.json({ 
        success: false, 
        valid: false,
        error: 'کۆدی ٦ ژمارەیی Google Authenticator هەڵەیە یان بەسەرچووە' 
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      valid: true,
      message: 'کۆدەکە بە سەرکەوتوویی پشتڕاستکرایەوە',
    });
  } catch (error: any) {
    console.error('2FA Verify error:', error);
    return NextResponse.json({ 
      success: false, 
      valid: false,
      error: 'هەڵەیەک لە سێرڤەر ڕوویدا لە کاتی پشکنینی کۆد' 
    }, { status: 500 });
  }
}
