import { NextResponse } from 'next/server';

const TIER_PASSWORDS: Record<string, number> = {
  [process.env.DEMO_PASSWORD_10 ?? '__invalid_10__']: 10,
  [process.env.DEMO_PASSWORD_20 ?? '__invalid_20__']: 20,
  [process.env.DEMO_PASSWORD_30 ?? '__invalid_30__']: 30,
  [process.env.DEMO_PASSWORD_40 ?? '__invalid_40__']: 40,
  [process.env.DEMO_PASSWORD_50 ?? '__invalid_50__']: 50,
  [process.env.DEMO_PASSWORD_60 ?? '__invalid_60__']: 60,
  [process.env.DEMO_PASSWORD_70 ?? '__invalid_70__']: 70,
  [process.env.DEMO_PASSWORD_80 ?? '__invalid_80__']: 80,
  [process.env.DEMO_PASSWORD_90 ?? '__invalid_90__']: 90,
  [process.env.DEMO_PASSWORD_100 ?? '__invalid_100__']: 100,
};

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  const tierPct = TIER_PASSWORDS[password];

  if (tierPct !== undefined) {
    const response = NextResponse.json(
      { success: true, tier: tierPct },
      { status: 200 }
    );
    response.cookies.set('maturefi_auth', password, {
      httpOnly: false,
      path: '/',
      maxAge: 604800,
    });
    response.cookies.set('maturefi_tier', String(tierPct), {
      httpOnly: false,
      path: '/',
      maxAge: 604800,
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
