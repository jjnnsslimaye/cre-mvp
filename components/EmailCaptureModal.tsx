'use client';

import { useState } from 'react';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmailCaptureModal({ isOpen, onClose }: EmailCaptureModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqejaykq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          source: 'modal',
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        setError('Failed to submit request. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '40px',
          maxWidth: '480px',
          width: '90%',
          boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.15)',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1,
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#262832')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
        >
          ×
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                color: '#262832',
                marginBottom: '16px',
              }}
            >
              ✓ Request received
            </div>
            <div
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#262832',
              }}
            >
              We'll be in touch at <strong>{email}</strong> with your access credentials.
            </div>
          </div>
        ) : (
          <>
            <h2
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: '24px',
                color: '#262832',
                margin: 0,
              }}
            >
              Unlock Full Access
            </h2>
            <p
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                color: '#585862',
                marginTop: '8px',
                marginBottom: '24px',
              }}
            >
              Get access to 334 enriched CRE loan records — UCC filings, entity data, skip trace contacts, and satellite mapping.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="name"
                  style={{
                    display: 'block',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#262832',
                    marginBottom: '6px',
                  }}
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#262832',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#65CCE6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
              </div>

              {/* Email Address */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#262832',
                    marginBottom: '6px',
                  }}
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#262832',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#65CCE6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
              </div>

              {/* Company */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  htmlFor="company"
                  style={{
                    display: 'block',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: '13px',
                    color: '#262832',
                    marginBottom: '6px',
                  }}
                >
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your firm or company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '14px',
                    color: '#262832',
                    border: '1px solid #e2e8f0',
                    borderRadius: '4px',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#65CCE6')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#e2e8f0')}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '48px',
                  backgroundColor: '#65CCE6',
                  color: '#262832',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.currentTarget.style.opacity = '1';
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Request Full Access'}
              </button>

              {/* Error message */}
              {error && (
                <div
                  style={{
                    marginTop: '12px',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    color: '#ef4444',
                  }}
                >
                  {error}
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
