import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = Math.min(parseInt(searchParams.get('limit') || '1000', 10), 3000);

    const session = await getServerSession(authOptions);

    // 1. Resolve Odoo credentials from the database
    let user = null;
    if (session?.user?.email) {
      user = await prisma.userAccount.findUnique({
        where: { email: session.user.email },
      });
    }

    // Fallback to an admin account with Odoo credentials if current user didn't save any
    if (!user || !user.odooApiKey) {
      user = await prisma.userAccount.findFirst({
        where: {
          odooApiKey: { not: null },
        },
        orderBy: {
          role: 'asc', // 'admin' comes first alphabetically
        },
      });
    }

    const odooUrl = (user?.odooUrl || process.env.ODOO_URL || "https://erp.halabjagroup.com").trim().replace(/\/+$/, '');
    const odooDb = (user?.odooDb || process.env.ODOO_DB || "HalabjaGroup").trim();
    const odooUser = (user?.odooUsername || process.env.ODOO_USER || "mohammed.iqbal@halabjagroup.com").trim();
    const odooPass = (user?.odooApiKey || process.env.ODOO_PASS || "").trim();

    if (!odooPass) {
      return NextResponse.json({
        success: false,
        error: "کلیلی Odoo API نەدۆزرایەوە. تکایە لە بەشی پرۆفایل کلیلەکەت پاشەکەوت بکە."
      }, { status: 400 });
    }

    // 2. Authenticate to get the UID
    const authPayload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "common",
        method: "authenticate",
        args: [odooDb, odooUser, odooPass, {}]
      },
      id: 1
    };

    const authRes = await fetch(`${odooUrl}/jsonrpc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authPayload)
    });

    if (!authRes.ok) {
      return NextResponse.json({
        success: false,
        error: `پەیوەندی بە سێرڤەری Odoo شکستی هێنا (کۆدی ${authRes.status})`
      }, { status: 502 });
    }

    const authData = await authRes.json();

    if (authData.error) {
      console.error("Odoo Auth Error:", authData.error);
      const errMsg = authData.error.data?.message || authData.error.message || "هەڵە لە سێرڤەری Odoo";
      return NextResponse.json({ success: false, error: `هەڵەی چوونەژوورەوەی Odoo: ${errMsg}` }, { status: 401 });
    }

    const uid = authData.result;
    if (!uid || typeof uid !== 'number') {
      console.error("Odoo Authentication Failed:", authData);
      return NextResponse.json({
        success: false,
        error: "زانیاری چوونەژوورەوەی Odoo هەڵەیە یان کلیلی API بەسەرچووە."
      }, { status: 401 });
    }

    // 3. Build dynamic date domain for Approval Requests
    const domain: any[] = [];
    if (startDate) {
      domain.push(["date", ">=", startDate]);
    } else {
      const date10DaysAgo = new Date();
      date10DaysAgo.setDate(date10DaysAgo.getDate() - 10);
      domain.push(["date", ">=", date10DaysAgo.toISOString().split("T")[0]]);
    }

    if (endDate) {
      domain.push(["date", "<=", `${endDate} 23:59:59`]);
    }

    const searchPayload = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          odooDb,
          uid,
          odooPass,
          "approval.request",
          "search_read",
          domain.length > 0 ? [domain] : [[]],
          { 
            limit,
            fields: ["name", "date", "approval_subject", "request_owner_id", "category_id"],
            order: "date desc, id desc"
          }
        ]
      },
      id: 2
    };

    const searchRes = await fetch(`${odooUrl}/jsonrpc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(searchPayload)
    });

    if (!searchRes.ok) {
      return NextResponse.json({
        success: false,
        error: `هەڵە لە کاتی ڕاکێشانی داتاکان لە Odoo (کۆدی ${searchRes.status})`
      }, { status: 502 });
    }
    
    const searchData = await searchRes.json();

    if (searchData.error) {
      console.error("Odoo Fetch Error:", searchData.error);
      const errMsg = searchData.error.data?.message || searchData.error.message || "هەڵەی سێرڤەری Odoo";
      return NextResponse.json({ success: false, error: `ڕاکێشانی داتا سەرکەوتوو نەبوو: ${errMsg}` }, { status: 500 });
    }

    // 4. Format the data for React component
    const formattedData = (searchData.result || []).map((item: any) => ({
      id: `odoo-${item.id}`,
      rawId: item.id,
      odooDate: item.date,
      approvalSubject: item.name,
      subject: item.approval_subject || "بێ بابەت",
      requestOwner: Array.isArray(item.request_owner_id) ? item.request_owner_id[1] : (item.request_owner_id || ''),
      category: Array.isArray(item.category_id) ? item.category_id[1] : (item.category_id || ''),
      webUrl: `${odooUrl}/web#id=${item.id}&model=approval.request&view_type=form`,
    }));

    return NextResponse.json({
      success: true,
      count: formattedData.length,
      dateRange: {
        startDate: startDate || null,
        endDate: endDate || null,
      },
      data: formattedData,
    });
  } catch (error: any) {
    console.error("Error fetching from Odoo:", error);
    return NextResponse.json({
      success: false,
      error: `هەڵەی ناوخۆیی ڕوویدا: ${error.message || 'پەیوەندی دروست نەبوو'}`
    }, { status: 500 });
  }
}
