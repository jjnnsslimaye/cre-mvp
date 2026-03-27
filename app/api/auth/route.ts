import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  const expectedPassword = process.env.DEMO_PASSWORD;

  if (password === expectedPassword) {
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Set authentication cookie
    response.cookies.set('maturefi_auth', password, {
      httpOnly: false,
      path: '/',
      maxAge: 604800, // 7 days
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
