import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const startTime = Date.now();
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: 'ڕێگەپێدراو نیت بۆ ئەنجامدانی ئەم کردارە' }, { status: 401 });
    }

    const body = await request.json();
    let { odooUrl, odooDb, odooUsername, odooApiKey } = body;

    // If apiKey not sent (user testing saved settings), retrieve from DB
    if (!odooApiKey) {
      const user = await prisma.userAccount.findUnique({
        where: { email: session.user.email },
        select: { odooApiKey: true }
      });
      if (user?.odooApiKey) {
        odooApiKey = user.odooApiKey;
      }
    }

    if (!odooUrl || !odooDb || !odooUsername || !odooApiKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'تکایە هەموو خانەکان پڕبکەرەوە (URL, Database, Username, API Key)' 
      }, { status: 400 });
    }

    // Clean up URL: remove trailing slash
    const cleanedUrl = odooUrl.replace(/\/+$/, '');

    // Authenticate via JSON-RPC
    const authPayload = {
      jsonrpc: '2.0',
      method: 'call',
      params: {
        service: 'common',
        method: 'authenticate',
        args: [odooDb.trim(), odooUsername.trim(), odooApiKey.trim(), {}]
      },
      id: Math.floor(Math.random() * 10000)
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const res = await fetch(`${cleanedUrl}/jsonrpc`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authPayload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeoutId));

    if (!res.ok) {
      const latencyMs = Date.now() - startTime;
      return NextResponse.json({ 
        success: false, 
        latencyMs,
        error: `سێرڤەری Odoo وەڵامی دایەوە بە کۆدی ${res.status} (${res.statusText})` 
      });
    }

    const data = await res.json();
    const latencyMs = Date.now() - startTime;

    if (data.error) {
      return NextResponse.json({ 
        success: false, 
        latencyMs,
        error: data.error.message || data.error.data?.message || 'هەڵە لە سێرڤەری Odoo ڕوویدا' 
      });
    }

    const uid = data.result;
    if (!uid || typeof uid !== 'number') {
      return NextResponse.json({ 
        success: false, 
        latencyMs,
        error: 'زانیارییەکان هەڵەن: بەکارهێنەر یان وشەی نهێنی / API Key نادروستە بۆ ئەم داتابەیسە' 
      });
    }

    // Optionally get server version info
    let serverVersion = 'نەزانراو';
    try {
      const versionPayload = {
        jsonrpc: '2.0',
        method: 'call',
        params: { service: 'common', method: 'version', args: [] },
        id: Math.floor(Math.random() * 10000)
      };
      const vRes = await fetch(`${cleanedUrl}/jsonrpc`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(versionPayload),
      });
      if (vRes.ok) {
        const vData = await vRes.json();
        if (vData.result?.server_version) {
          serverVersion = vData.result.server_version;
        }
      }
    } catch {
      // ignore
    }

    return NextResponse.json({ 
      success: true, 
      uid, 
      serverVersion,
      latencyMs,
      message: `بەستنەوە بە سەرکەوتوویی ئەنجامدرا! ناسنامەی بەکارهێنەر: ${uid} (وەشانی Odoo: ${serverVersion})` 
    });

  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    if (err.name === 'AbortError') {
      return NextResponse.json({ 
        success: false, 
        latencyMs,
        error: 'کاتی چاوەڕوانی بەستنەوە تەواو بوو (Timeout). تکایە لە دروستی بەستەری Odoo دڵنیابە.' 
      });
    }
    return NextResponse.json({ 
      success: false, 
      latencyMs,
      error: `نەتوانرا پەیوەندی بە Odoo ببەسترێت: ${err.message || 'هەڵەی نەزانراو'}` 
    });
  }
}
