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

        {/* Right: Navigation links */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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

          <Link
            href="/early-access"
            style={{
              backgroundColor: colors.accentCyan,
              borderRadius: '4px',
              padding: '0px 32px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '16px',
              color: colors.black,
              textDecoration: 'none',
            }}
          >
            Get early access ↗
          </Link>
        </div>
      </div>
    </nav>
  );
}
