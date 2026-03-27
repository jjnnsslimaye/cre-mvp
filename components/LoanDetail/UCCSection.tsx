'use client';

import { useState } from 'react';
import type { UCCFiling } from '@/lib/types';

interface UCCSectionProps {
  uccFilings: Record<string, UCCFiling[]>;
}

const colors = {
  background: '#f5fafc',
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  accent: '#f0c811',
  midBlue: '#7cacdb',
  footerText: '#92a6c2',
};

function getUrgencyBadgeStyle(urgency: string) {
  switch (urgency) {
    case 'critical':
      return { backgroundColor: '#ef4444', color: '#ffffff' };
    case 'near-term':
      return { backgroundColor: colors.accent, color: colors.primaryText };
    case 'mid-term':
      return { backgroundColor: colors.midBlue, color: '#ffffff' };
    case 'long-term':
      return { backgroundColor: colors.footerText, color: '#ffffff' };
    default:
      return { backgroundColor: '#94a3b8', color: '#ffffff' };
  }
}

function extractName(raw: string) {
  return raw.split(/\d/)[0].trim();
}

function UCCAccordion({ borrower, filings }: { borrower: string; filings: UCCFiling[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCollateral, setExpandedCollateral] = useState<Set<number>>(new Set());

  const sortedFilings = [...filings].sort((a, b) => {
    if (a.Status === 'Filed' && b.Status !== 'Filed') return -1;
    if (a.Status !== 'Filed' && b.Status === 'Filed') return 1;
    return 0;
  });

  const toggleCollateral = (idx: number) => {
    const newSet = new Set(expandedCollateral);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedCollateral(newSet);
  };

  return (
    <div
      className="rounded-xl"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.lightBlueTint}`,
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors"
        style={{ color: colors.primaryText }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.background)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span className="font-semibold">
          {borrower} <span style={{ color: '#5e7391' }}>({filings.length})</span>
        </span>
        <span style={{ color: colors.secondaryText }}>{isOpen ? '▼' : '▶'}</span>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-4">
          {sortedFilings.map((filing, idx) => (
            <div
              key={idx}
              className="rounded-lg p-4 space-y-3"
              style={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.lightBlueTint}`,
              }}
            >
              <div className="flex gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: filing.Status === 'Filed' ? '#22c55e' : colors.footerText,
                    color: '#ffffff',
                  }}
                >
                  {filing.Status}
                </span>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={getUrgencyBadgeStyle(filing.urgency)}
                >
                  {filing.urgency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs" style={{ color: colors.secondaryText }}>
                    Date Filed:
                  </span>
                  <span className="ml-2" style={{ color: colors.primaryText }}>
                    {filing['Date Filed']}
                  </span>
                </div>
                <div>
                  <span className="text-xs" style={{ color: colors.secondaryText }}>
                    Expires:
                  </span>
                  <span className="ml-2" style={{ color: colors.primaryText }}>
                    {filing.Expires}
                  </span>
                </div>
              </div>

              <div className="text-sm">
                <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                  Secured Party:
                </div>
                <div style={{ color: colors.primaryText }}>
                  {filing.secured_parties.map((party, i) => (
                    <div key={i}>{extractName(party.raw)}</div>
                  ))}
                </div>
              </div>

              <div className="text-sm">
                <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                  Debtor Party:
                </div>
                <div style={{ color: colors.primaryText }}>
                  {filing.debtor_parties.map((party, i) => (
                    <div key={i}>{extractName(party.raw)}</div>
                  ))}
                </div>
              </div>

              {filing._ocr_success && filing.collateral ? (
                <div className="text-sm">
                  <button
                    onClick={() => toggleCollateral(idx)}
                    className="flex items-center gap-2 text-xs mb-2 transition-colors"
                    style={{ color: colors.secondaryText }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryText)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondaryText)}
                  >
                    <span>{expandedCollateral.has(idx) ? '▼' : '▶'}</span>
                    <span>Collateral</span>
                  </button>
                  {expandedCollateral.has(idx) && (
                    <pre
                      className="text-xs p-3 rounded max-h-[150px] overflow-y-auto whitespace-pre-wrap"
                      style={{
                        backgroundColor: colors.background,
                        border: `1px solid ${colors.lightBlueTint}`,
                        color: colors.secondaryText,
                      }}
                    >
                      {filing.collateral}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="text-sm">
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Collateral:
                  </div>
                  <div className="italic" style={{ color: colors.footerText }}>
                    Not extracted
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function UCCSection({ uccFilings }: UCCSectionProps) {
  return (
    <section
      className="rounded-xl shadow-sm overflow-hidden"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.lightBlueTint}`,
      }}
    >
      <h2
        className="text-lg font-bold px-6 py-2"
        style={{
          color: colors.white,
          backgroundColor: colors.primaryText,
          borderTopLeftRadius: '0.75rem',
          borderTopRightRadius: '0.75rem',
        }}
      >
        UCC Filings
      </h2>
      <div className="p-6 space-y-4">
        {Object.entries(uccFilings).map(([borrower, filings]) => (
          <UCCAccordion key={borrower} borrower={borrower} filings={filings} />
        ))}
      </div>
    </section>
  );
}
