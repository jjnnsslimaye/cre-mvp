'use client';

import Link from 'next/link';

const colors = {
  navBg: '#123B56',
  accentCyan: '#65CCE6',
  white: '#FFFFFF',
  black: '#000000',
};

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  return (
    <nav
      style={{
        backgroundColor: colors.navBg,
        padding: '20px 0',
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: MatuReFi wordmark */}
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: '30px',
            color: colors.white,
            textDecoration: 'none',
          }}
        >
          MatuReFi
        </Link>

        {/* Right: Login button */}
        {!isAuthenticated && (
          <Link
            href="/login"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '4px',
              padding: '0px 32px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '16px',
              color: '#123B56',
              textDecoration: 'none',
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
