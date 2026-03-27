'use client';

import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import NavLogo from '@/components/NavLogo';

const playfair = Playfair_Display({ subsets: ['latin'] });

const colors = {
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  accent: '#f0c811',
};

export default function LoanDetailHeader() {
  return (
    <nav
      style={{
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.lightBlueTint}`,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <NavLogo />
          <h1
            className={`text-3xl font-bold ${playfair.className}`}
            style={{ color: colors.primaryText }}
          >
            MatuReFi
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/early-access"
            className="text-base font-medium px-4 py-2 rounded-full transition-colors"
            style={{
              color: colors.primaryText,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.accent}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Early Access
          </Link>
          <Link
            href="/loans"
            className="text-base font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2"
            style={{
              color: colors.primaryText,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.accent}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
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
