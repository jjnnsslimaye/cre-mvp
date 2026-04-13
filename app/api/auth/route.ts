import { NextResponse } from 'next/server';
import { getTierFromPassword, TIERS } from '@/lib/tiers';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  console.log('Auth attempt received');
  console.log('Password received length:', password?.length);
  console.log('DEMO_PASSWORD_10 exists:', !!process.env.DEMO_PASSWORD_10);
  console.log('DEMO_PASSWORD_10 length:', process.env.DEMO_PASSWORD_10?.length);
  console.log('TIERS count:', TIERS.length);

  const tier = getTierFromPassword(password);

  if (tier) {
    const response = NextResponse.json({ success: true, tier: tier.pct }, { status: 200 });

    // Set authentication cookie
    response.cookies.set('maturefi_auth', password, {
      httpOnly: false,
      path: '/',
      maxAge: 604800, // 7 days
    });

    // Set tier cookie
    response.cookies.set('maturefi_tier', String(tier.pct), {
      httpOnly: false,
      path: '/',
      maxAge: 604800, // 7 days
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
