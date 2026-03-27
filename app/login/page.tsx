'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

const colors = {
  background: '#f5fafc',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  accent: '#f0c811',
  lightBlueTint: '#dae6f1',
  white: '#ffffff',
  placeholder: '#92a6c2',
  error: '#ef4444',
};

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/loans';
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md px-6">
        {/* Wordmark and Subtitle */}
        <Link href="/" className="block mb-8 text-center">
          <h1
            className={`text-5xl font-bold mb-2 ${playfair.className}`}
            style={{ color: colors.primaryText }}
          >
            MatuReFi
          </h1>
          <p
            className="text-sm"
            style={{ color: colors.secondaryText }}
          >
            Distressed CRE Loan Intelligence
          </p>
        </Link>

        {/* Login Card */}
        <div
          className="rounded-xl p-8 shadow-md"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.lightBlueTint}`,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.lightBlueTint}`,
                  color: colors.primaryText,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.accent;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.lightBlueTint;
                }}
                disabled={isLoading}
                required
              />
            </div>

            {error && (
              <div className="text-sm" style={{ color: colors.error }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg font-bold transition-all hover:brightness-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.accent,
                color: colors.primaryText,
              }}
            >
              {isLoading ? 'Entering...' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
