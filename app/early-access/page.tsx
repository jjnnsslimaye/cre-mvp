'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import NavLogo from '@/components/NavLogo';

const playfair = Playfair_Display({ subsets: ['latin'] });

const colors = {
  background: '#f5fafc',
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  accent: '#f0c811',
  footerText: '#92a6c2',
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
          backgroundColor: colors.white,
          borderBottom: `1px solid ${colors.lightBlueTint}`,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <NavLogo />
            <h1 className={`text-3xl font-bold ${playfair.className}`} style={{ color: colors.primaryText }}>
              MatuReFi
            </h1>
          </Link>
          <Link
            href="/"
            className="text-base font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2"
            style={{ color: colors.secondaryText }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryText)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondaryText)}
          >
            <span>←</span>
            <span>Back</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 flex justify-center">
        <div
          className="rounded-xl shadow-sm"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.lightBlueTint}`,
            maxWidth: '560px',
            width: '100%',
            padding: '40px',
          }}
        >
          <div
            className="text-xl font-bold mb-2 pb-3"
            style={{
              color: colors.primaryText,
              borderLeft: `4px solid #1c71af`,
              paddingLeft: '16px',
            }}
          >
            Request Early Access
          </div>

          <div className="text-sm mb-6" style={{ color: colors.secondaryText, paddingLeft: '20px' }}>
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
                <label className="block text-sm font-medium mb-2" style={{ color: colors.primaryText }}>
                  Full Name <span style={{ color: colors.error }}>*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.lightBlueTint}`,
                    color: colors.primaryText,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.primaryText }}>
                  Email Address <span style={{ color: colors.error }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.lightBlueTint}`,
                    color: colors.primaryText,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.primaryText }}>
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your firm or company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.lightBlueTint}`,
                    color: colors.primaryText,
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: colors.primaryText }}>
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us about your use case"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.lightBlueTint}`,
                    color: colors.primaryText,
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 rounded-lg font-bold transition-all"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primaryText,
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
