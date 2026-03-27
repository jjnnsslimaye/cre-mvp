import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to /, /login, /early-access, and /api/* without authentication
  if (pathname === '/' || pathname === '/login' || pathname === '/early-access' || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Check for authentication cookie
  const authCookie = request.cookies.get('maturefi_auth');
  const expectedPassword = process.env.DEMO_PASSWORD;

  if (!authCookie || authCookie.value !== expectedPassword) {
    // Redirect to login if not authenticated
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
