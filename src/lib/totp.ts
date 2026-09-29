import crypto from 'crypto';
import QRCode from 'qrcode';

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// Decode a Base32 string into a Buffer
export function base32Decode(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/=+$/, '').trim();
  let bits = 0;
  let value = 0;
  let index = 0;
  const output = new Uint8Array(((clean.length * 5) / 8) | 0);

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const val = BASE32_ALPHABET.indexOf(char);
    if (val === -1) continue;
    value = (value << 5) | val;
    bits += 5;
    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255;
      bits -= 8;
    }
  }
  return Buffer.from(output.buffer, output.byteOffset, index);
}

// Encode a Buffer into a Base32 string
export function base32Encode(buffer: Buffer): string {
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i];
    bits += 8;
    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }
  return output;
}

// Generate a new 20-byte Base32 secret for Google Authenticator
export function generateTOTPSecret(): string {
  const randomBytes = crypto.randomBytes(20);
  return base32Encode(randomBytes);
}

// Format the official otpauth:// URI for Google Authenticator
export function getOtpAuthUrl(email: string, secret: string, issuer: string = 'HTS Badwadachoon'): string {
  const encodedIssuer = encodeURIComponent(issuer);
  const encodedEmail = encodeURIComponent(email);
  return `otpauth://totp/${encodedIssuer}:${encodedEmail}?secret=${secret}&issuer=${encodedIssuer}&algorithm=SHA1&digits=6&period=30`;
}

// Generate a Base64 PNG Data URL of the QR code
export async function generateQRCodeDataUrl(otpAuthUrl: string): Promise<string> {
  return await QRCode.toDataURL(otpAuthUrl, {
    width: 260,
    margin: 2,
    color: {
      dark: '#0f172a',
      light: '#ffffff',
    },
  });
}

// Verify a 6-digit TOTP code against a Base32 secret (with +/- 1 step = +/- 30s window)
export function verifyTOTP(secret: string, userCode: string, window: number = 1): boolean {
  if (!secret || !userCode) return false;
  const cleanCode = userCode.trim().replace(/\s+/g, '');
  if (cleanCode.length !== 6) return false;

  const currentCounter = Math.floor(Date.now() / 1000 / 30);
  const key = base32Decode(secret);

  for (let i = -window; i <= window; i++) {
    const counter = currentCounter + i;
    const buf = Buffer.alloc(8);
    buf.writeBigInt64BE(BigInt(counter));

    const hmac = crypto.createHmac('sha1', key).update(buf).digest();
    const offset = hmac[hmac.length - 1] & 0x0f;
    const binary =
      ((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff);

    const generatedCode = (binary % 1000000).toString().padStart(6, '0');
    if (generatedCode === cleanCode) {
      return true;
    }
  }

  return false;
}
