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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
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
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: '#f0c811',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'Poppins, sans-serif',
              lineHeight: 1,
            }}
          >
            Open Beta · Free Access
          </div>
        </div>

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
