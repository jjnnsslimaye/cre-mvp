'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

const colors = {
  heroBg: 'linear-gradient(328.46deg, #2781BC 3.13%, #123B56 43.55%)',
  white: '#FFFFFF',
  accentCyan: '#65CCE6',
  primaryText: '#262832',
  error: '#ff6b6b',
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
      style={{
        background: colors.heroBg,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      {/* Wordmark and Subtitle */}
      <Link
        href="/"
        style={{
          textDecoration: 'none',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: '36px',
            color: colors.white,
            margin: 0,
          }}
        >
          MatuReFi
        </h1>
        <p
          style={{
            fontWeight: 400,
            fontSize: '16px',
            color: 'rgba(255,255,255,0.6)',
            marginTop: '8px',
          }}
        >
          Distressed CRE Loan Intelligence
        </p>
      </Link>

      {/* Login Card */}
      <div
        style={{
          marginTop: '32px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px',
          padding: '40px',
          backdropFilter: 'blur(10px)',
          maxWidth: '420px',
          width: '100%',
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '6px',
                color: colors.white,
                fontWeight: 400,
                fontSize: '15px',
                outline: 'none',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = colors.accentCyan;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255,255,255,0.2)';
              }}
              disabled={isLoading}
              required
            />
          </div>

          {error && (
            <div
              style={{
                color: colors.error,
                fontWeight: 400,
                fontSize: '14px',
                marginTop: '8px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              height: '48px',
              marginTop: error ? '16px' : '24px',
              backgroundColor: colors.accentCyan,
              color: colors.primaryText,
              fontWeight: 600,
              fontSize: '16px',
              borderRadius: '4px',
              border: 'none',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
              transition: 'filter 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.filter = 'brightness(0.9)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'brightness(1)';
            }}
          >
            {isLoading ? 'Entering...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
