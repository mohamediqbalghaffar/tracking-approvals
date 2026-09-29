import https from 'https';
import querystring from 'querystring';

export interface ExchangeAuthResult {
  success: boolean;
  error?: string;
  email?: string;
}

/**
 * Verifies email and password credentials directly against Halabja Group's official
 * Microsoft Exchange Server (https://mail.halabjagroup.com/owa/auth.owa) in real-time.
 * 
 * NOTE: Credentials are NEVER stored, logged, or retained. They are sent directly via HTTPS
 * to the Exchange server to authenticate identity, and discarded immediately.
 */
export async function verifyExchangeAuth(emailInput: string, passwordInput: string): Promise<ExchangeAuthResult> {
  const cleanEmail = emailInput.trim().toLowerCase();
  const cleanPassword = passwordInput.trim();

  if (!cleanEmail || !cleanPassword) {
    return { success: false, error: "تکایە ئیمەیڵ و تێپەڕوشەی پۆستی کۆمپانیا بنووسە" };
  }

  // Attempt login with full UPN email, fallback to username (sAMAccountName) if needed
  const attempts: string[] = [cleanEmail];
  if (cleanEmail.includes('@halabjagroup.com')) {
    attempts.push(cleanEmail.split('@')[0]);
  }

  for (const usernameToTry of attempts) {
    const postData = querystring.stringify({
      destination: 'https://mail.halabjagroup.com/owa/',
      flags: '4',
      forcedownlevel: '0',
      username: usernameToTry,
      password: cleanPassword,
      isUtf8: '1'
    });

    try {
      const result = await new Promise<{ success: boolean; reason?: string }>((resolve) => {
        const req = https.request({
          hostname: 'mail.halabjagroup.com',
          port: 443,
          path: '/owa/auth.owa',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) HTS-Auth/1.0'
          },
          rejectUnauthorized: false,
          timeout: 10000
        }, (res) => {
          const location = res.headers['location'] || '';
          const setCookies = res.headers['set-cookie'] || [];
          const hasCadata = setCookies.some(c => c.startsWith('cadata='));
          const hasReason = location.includes('reason=');

          if (hasCadata && !hasReason) {
            resolve({ success: true });
          } else if (hasReason) {
            const match = location.match(/reason=(\d+)/);
            resolve({ success: false, reason: match ? match[1] : '2' });
          } else if (res.statusCode === 302 && location.includes('/owa/')) {
            resolve({ success: true });
          } else {
            resolve({ success: false, reason: 'unknown' });
          }
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({ success: false, reason: 'timeout' });
        });

        req.on('error', (err) => {
          console.error('Exchange connection error:', err);
          resolve({ success: false, reason: 'connection_error' });
        });

        req.write(postData);
        req.end();
      });

      if (result.success) {
        return { success: true, email: cleanEmail };
      }

      if (result.reason === '4') {
        return { success: false, error: 'تێپەڕوشەی پۆستەکەت بەسەرچووە یان هەژمارەکەت قفڵ کراوە لەلایەن سێرڤەرەوە' };
      }
      if (result.reason === 'timeout' || result.reason === 'connection_error') {
        return { success: false, error: 'نەتوانرا پەیوەندی بە سێرڤەری پۆستی mail.halabjagroup.com بکرێت' };
      }
    } catch (e: any) {
      console.error('Exchange auth exception:', e);
    }
  }

  return { success: false, error: 'ئیمەیڵ یان تێپەڕوشەی پۆستی کۆمپانیا هەڵەیە' };
}
