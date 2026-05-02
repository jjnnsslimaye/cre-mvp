import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const TIER_ENV_VARS = [
  'DEMO_PASSWORD_10',
  'DEMO_PASSWORD_20',
  'DEMO_PASSWORD_30',
  'DEMO_PASSWORD_30_1',
  'DEMO_PASSWORD_30_2',
  'DEMO_PASSWORD_30_3',
  'DEMO_PASSWORD_30_4',
  'DEMO_PASSWORD_30_5',
  'DEMO_PASSWORD_40',
  'DEMO_PASSWORD_40_1',
  'DEMO_PASSWORD_40_2',
  'DEMO_PASSWORD_40_3',
  'DEMO_PASSWORD_40_4',
  'DEMO_PASSWORD_40_5',
  'DEMO_PASSWORD_50',
  'DEMO_PASSWORD_60',
  'DEMO_PASSWORD_70',
  'DEMO_PASSWORD_80',
  'DEMO_PASSWORD_90',
  'DEMO_PASSWORD_100',
];

function isValidPassword(password: string): boolean {
  return TIER_ENV_VARS.some(envVar => {
    const envPassword = process.env[envVar];
    return envPassword && password === envPassword;
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to /, /login, /early-access, and /api/* without authentication
  if (pathname === '/' || pathname === '/login' || pathname === '/early-access' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for authentication cookie
  const authCookie = request.cookies.get('maturefi_auth');

  if (!authCookie) {
    // Redirect to login if no auth cookie
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Validate password against tier system
  if (!isValidPassword(authCookie.value)) {
    // Redirect to login if password doesn't match any tier
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/loans',
    '/loans/:path*',
  ]
};
