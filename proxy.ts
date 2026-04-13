import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTierFromPassword } from './lib/tiers';

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
  const tier = getTierFromPassword(authCookie.value);

  if (!tier) {
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
