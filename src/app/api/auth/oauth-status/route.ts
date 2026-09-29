import { NextResponse } from 'next/server';

export async function GET() {
  const hasGoogle = Boolean(
    process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  );
  const hasAzure = Boolean(
    process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET
  );

  return NextResponse.json({
    google: hasGoogle,
    azure: hasAzure,
  });
}
