'use client';

import { useState } from 'react';
import Link from 'next/link';

const colors = {
  background: '#FFFFFF',
  white: '#FFFFFF',
  cardBorder: '#e2e8f0',
  primaryText: '#262832',
  secondaryText: '#585862',
  accentCyan: '#65CCE6',
  navBg: '#123B56',
  placeholder: '#94a3b8',
  error: '#ef4444',
};

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://formspree.io/f/meepeodp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmittedEmail(formData.email);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
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

          {/* Right: Back link */}
          <Link
            href="/"
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
            <span>Back</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex justify-center">
        <div
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 66, 110, 0.08)',
            maxWidth: '560px',
            width: '100%',
            padding: '40px',
          }}
        >
          <div
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: colors.primaryText,
              borderLeft: `4px solid ${colors.accentCyan}`,
              paddingLeft: '16px',
              marginBottom: '8px',
            }}
          >
            Request Early Access
          </div>

          <div
            style={{
              fontSize: '14px',
              fontWeight: 400,
              color: colors.secondaryText,
              marginBottom: '24px',
              paddingLeft: '20px',
            }}
          >
            MatuReFi is currently in private beta. Join the waitlist to be notified when access opens.
          </div>

          {status === 'success' ? (
            <div className="text-center py-8" style={{ color: colors.primaryText }}>
              <div className="text-2xl mb-3">✓ Request received</div>
              <div className="text-sm">
                We'll be in touch at <strong>{submittedEmail}</strong>. Thank you for your interest in MatuReFi.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.primaryText,
                  }}
                >
                  Full Name <span style={{ color: colors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: '6px',
                    padding: '10px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: colors.primaryText,
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = colors.accentCyan)}
                  onBlur={(e) => (e.target.style.borderColor = colors.cardBorder)}
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.primaryText,
                  }}
                >
                  Email Address <span style={{ color: colors.error }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: '6px',
                    padding: '10px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: colors.primaryText,
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = colors.accentCyan)}
                  onBlur={(e) => (e.target.style.borderColor = colors.cardBorder)}
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.primaryText,
                  }}
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your firm or company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: '6px',
                    padding: '10px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: colors.primaryText,
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = colors.accentCyan)}
                  onBlur={(e) => (e.target.style.borderColor = colors.cardBorder)}
                />
              </div>

              <div>
                <label
                  className="block mb-2"
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: colors.primaryText,
                  }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your use case"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.cardBorder}`,
                    borderRadius: '6px',
                    padding: '10px 14px',
                    fontSize: '15px',
                    fontWeight: 400,
                    color: colors.primaryText,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = colors.accentCyan)}
                  onBlur={(e) => (e.target.style.borderColor = colors.cardBorder)}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full transition-all"
                style={{
                  backgroundColor: colors.accentCyan,
                  color: colors.primaryText,
                  borderRadius: '6px',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  border: 'none',
                  opacity: status === 'loading' ? 0.7 : 1,
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                }}
                onMouseEnter={(e) => {
                  if (status !== 'loading') {
                    e.currentTarget.style.filter = 'brightness(0.95)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                {status === 'loading' ? 'Submitting...' : 'Request Early Access'}
              </button>

              {status === 'error' && (
                <div className="text-sm text-center" style={{ color: colors.error }}>
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
