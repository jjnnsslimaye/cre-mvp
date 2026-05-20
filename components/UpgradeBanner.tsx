'use client';

interface UpgradeBannerProps {
  onUpgradeClick: () => void;
}

export default function UpgradeBanner({ onUpgradeClick }: UpgradeBannerProps) {
  return (
    <div
      className="flex flex-col items-center text-center gap-4 md:flex-row md:items-center md:text-left md:gap-0 md:justify-between"
      style={{
        width: '100%',
        backgroundColor: '#f0fbff',
        border: '2px solid #65CCE6',
        borderRadius: '12px',
        padding: '20px 32px',
        margin: '0 0 24px 0',
        boxShadow: '0 4px 20px rgba(101,204,230,0.15)',
      }}
    >
      {/* Left side */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(14px, 4vw, 18px)',
            color: '#123B56',
            marginBottom: '6px',
          }}
        >
          You're seeing 167 loans. There are <span style={{ color: '#ef4444', fontWeight: 800 }}>167 more</span> waiting.
        </div>
        <div
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(11px, 3vw, 13px)',
            color: '#585862',
          }}
        >
          Sign up free — takes less than a minute. No credit card. No contract.
        </div>
      </div>

      {/* Right side */}
      <button
        onClick={onUpgradeClick}
        className="w-full md:w-auto"
        style={{
          backgroundColor: '#ef4444',
          color: '#ffffff',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '14px',
          borderRadius: '6px',
          padding: '12px 28px',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
      >
        Unlock 167 More Loans →
      </button>
    </div>
  );
}
