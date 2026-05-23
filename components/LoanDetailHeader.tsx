'use client';

import Link from 'next/link';

const colors = {
  navBg: '#123B56',
  accentCyan: '#65CCE6',
  white: '#FFFFFF',
  black: '#000000',
};

export default function LoanDetailHeader() {
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

        {/* Right: Navigation links */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link
            href="/loans"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            <span>←</span>
            <span>Back to Loans</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
