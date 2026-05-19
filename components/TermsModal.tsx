'use client';

import { useState, useEffect } from 'react';

const TERMS_KEY = 'maturefi_terms_accepted';

export default function TermsModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = sessionStorage.getItem(TERMS_KEY);
    if (!accepted) setShow(true);
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem(TERMS_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Header */}
        <div
          style={{
            borderLeft: '4px solid #65CCE6',
            paddingLeft: '16px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              fontFamily: 'inherit',
              fontSize: '20px',
              fontWeight: 700,
              color: '#262832',
              marginBottom: '4px',
            }}
          >
            Before You Continue
          </div>
          <div
            style={{
              fontSize: '13px',
              color: '#585862',
            }}
          >
            MatuReFi Platform — Terms of Use
          </div>
        </div>

        {/* Terms content */}
        <div
          style={{
            fontSize: '13px',
            color: '#585862',
            lineHeight: '1.8',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <p style={{ margin: 0 }}>By accessing this platform you agree to the following:</p>

          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: '#65CCE6', fontWeight: 700, flexShrink: 0 }}>1.</span>
              <span>
                <strong style={{ color: '#262832' }}>DNC Compliance.</strong> You acknowledge that Do
                Not Call (DNC) registration status is displayed on contact records. You are solely
                responsible for reviewing DNC flags and complying with all applicable TCPA
                regulations before making any outreach.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: '#65CCE6', fontWeight: 700, flexShrink: 0 }}>2.</span>
              <span>
                <strong style={{ color: '#262832' }}>Data Accuracy.</strong> Contact and enrichment
                data is algorithmically matched and may not be fully accurate. You agree to
                independently verify data before acting on it.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: '#65CCE6', fontWeight: 700, flexShrink: 0 }}>3.</span>
              <span>
                <strong style={{ color: '#262832' }}>Permitted Use.</strong> Data may only be used
                for CRE loan origination or refinancing outreach. Redistribution, resale, or bulk
                export of data is strictly prohibited.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: '#65CCE6', fontWeight: 700, flexShrink: 0 }}>4.</span>
              <span>
                <strong style={{ color: '#262832' }}>Liability.</strong> All liability for outreach
                activities using data from this platform rests solely with you as the user.
              </span>
            </div>
          </div>
        </div>

        {/* Accept button */}
        <button
          onClick={handleAccept}
          style={{
            width: '100%',
            height: '48px',
            backgroundColor: '#123B56',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: 'inherit',
            cursor: 'pointer',
            marginBottom: '12px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1c71af')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#123B56')}
        >
          I Understand and Accept
        </button>

        <div
          style={{
            fontSize: '11px',
            color: '#94a3b8',
            textAlign: 'center',
            lineHeight: '1.6',
          }}
        >
          By clicking above you acknowledge these terms for this session. Full terms available upon
          request at info@maturefi.com
        </div>
      </div>
    </div>
  );
}
