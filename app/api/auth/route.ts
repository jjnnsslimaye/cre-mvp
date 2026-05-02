import { NextResponse } from 'next/server';

const TIER_ENV_VARS: Record<string, number> = {
  DEMO_PASSWORD_10: 10,
  DEMO_PASSWORD_20: 20,
  DEMO_PASSWORD_30: 30,
  DEMO_PASSWORD_30_1: 30,
  DEMO_PASSWORD_30_2: 30,
  DEMO_PASSWORD_30_3: 30,
  DEMO_PASSWORD_30_4: 30,
  DEMO_PASSWORD_30_5: 30,
  DEMO_PASSWORD_40: 40,
  DEMO_PASSWORD_40_1: 40,
  DEMO_PASSWORD_40_2: 40,
  DEMO_PASSWORD_40_3: 40,
  DEMO_PASSWORD_40_4: 40,
  DEMO_PASSWORD_40_5: 40,
  DEMO_PASSWORD_50: 50,
  DEMO_PASSWORD_60: 60,
  DEMO_PASSWORD_70: 70,
  DEMO_PASSWORD_80: 80,
  DEMO_PASSWORD_90: 90,
  DEMO_PASSWORD_100: 100,
};

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  console.log('Auth attempt, password length:', password?.length);

  let matchedTier: number | null = null;

  for (const [envVar, pct] of Object.entries(TIER_ENV_VARS)) {
    const envValue = process.env[envVar];
    console.log(`Checking ${envVar}: exists=${!!envValue}`);
    if (envValue && password === envValue) {
      matchedTier = pct;
      break;
    }
  }

  console.log('Matched tier:', matchedTier);

  if (matchedTier !== null) {
    const response = NextResponse.json(
      { success: true, tier: matchedTier },
      { status: 200 }
    );
    response.cookies.set('maturefi_auth', password, {
      httpOnly: false,
      path: '/',
      maxAge: 604800,
    });
    response.cookies.set('maturefi_tier', String(matchedTier), {
      httpOnly: false,
      path: '/',
      maxAge: 604800,
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
