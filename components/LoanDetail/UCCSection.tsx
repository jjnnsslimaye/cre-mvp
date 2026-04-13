'use client';

import { useState } from 'react';
import type { UCCFiling, UCCFilingWithBorrower } from '@/lib/types';

interface UCCSectionProps {
  uccFilings: Record<string, UCCFiling[]>;
}

const colors = {
  white: '#FFFFFF',
  cardBorder: '#e2e8f0',
  primaryText: '#262832',
  secondaryText: '#585862',
  innerCardBg: '#f8fafc',
  sectionHeaderBg: '#123B56',
  sectionHeaderText: '#FFFFFF',
  accentCyan: '#65CCE6',
  muted: '#94a3b8',
};

function getUrgencyBadgeStyle(urgency: string) {
  switch (urgency) {
    case 'critical':
      return { backgroundColor: '#ef4444', color: '#ffffff' };
    case 'near-term':
      return { backgroundColor: '#65CCE6', color: '#262832' };
    case 'mid-term':
      return { backgroundColor: '#7cacdb', color: '#ffffff' };
    case 'long-term':
      return { backgroundColor: '#92a6c2', color: '#ffffff' };
    default:
      return { backgroundColor: '#94a3b8', color: '#ffffff' };
  }
}

function extractName(raw: string) {
  return raw.split(/\d/)[0].trim();
}

export default function UCCSection({ uccFilings }: UCCSectionProps) {
  const [collateralExpanded, setCollateralExpanded] = useState(false);
  const [reasonsOpen, setReasonsOpen] = useState(false);

  // Flatten all filings from all borrowers
  const allFilings: UCCFilingWithBorrower[] =
    Object.entries(uccFilings).flatMap(
      ([borrowerName, filings]) =>
        filings.map(filing => ({
          ...filing,
          borrowerName
        } as UCCFilingWithBorrower))
    );

  // Find primary match or fallback to first filing
  const primaryFiling =
    allFilings.find(f => f.is_primary_match === true) ?? allFilings[0];

  return (
    <section
      className="shadow-sm overflow-hidden"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: '12px',
      }}
    >
      <h2
        className="px-6 py-2"
        style={{
          color: colors.sectionHeaderText,
          backgroundColor: colors.sectionHeaderBg,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          borderLeft: `4px solid ${colors.accentCyan}`,
          fontWeight: 600,
          fontSize: '1.125rem',
        }}
      >
        UCC Filing
      </h2>
      <div className="p-6">
        {!primaryFiling ? (
          <div style={{
            color: colors.muted,
            fontStyle: 'italic',
            padding: '20px',
            textAlign: 'center',
          }}>
            No UCC filings found
          </div>
        ) : (
          <>
            {/* Borrower name label */}
            <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
              Borrower: {primaryFiling.borrowerName}
            </div>

            {/* Filing card */}
            <div
              className="rounded-lg p-4 space-y-3"
              style={{
                backgroundColor: primaryFiling.is_primary_match ? '#f0fbff' : colors.white,
                border: `1px solid ${colors.cardBorder}`,
                borderLeft: primaryFiling.is_primary_match ? '3px solid #65CCE6' : `1px solid ${colors.cardBorder}`,
              }}
            >
              {/* Status / Urgency / Confidence / Score bar */}
              {primaryFiling.is_primary_match && primaryFiling.match_confidence && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '12px',
                }}>
                  {/* Status badge */}
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: primaryFiling.Status === 'Filed' ? '#22c55e' : '#94a3b8',
                      color: '#ffffff',
                    }}
                  >
                    {primaryFiling.Status}
                  </span>

                  {/* Urgency badge */}
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={getUrgencyBadgeStyle(primaryFiling.urgency)}
                  >
                    {primaryFiling.urgency}
                  </span>

                  {/* Confidence badge */}
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '999px',
                    backgroundColor:
                      primaryFiling.match_confidence === 'high' ? '#dcfce7' :
                      primaryFiling.match_confidence === 'medium' ? '#fef9c3' : '#f1f5f9',
                    color:
                      primaryFiling.match_confidence === 'high' ? '#166534' :
                      primaryFiling.match_confidence === 'medium' ? '#854d0e' : '#475569',
                  }}>
                    {primaryFiling.match_confidence.charAt(0).toUpperCase() +
                     primaryFiling.match_confidence.slice(1)} confidence
                  </span>

                  {/* Score */}
                  {primaryFiling.match_score != null && (
                    <span style={{ fontSize: '11px', color: '#585862' }}>
                      Match score: {primaryFiling.match_score.toFixed(1)}
                    </span>
                  )}
                </div>
              )}

              {/* Match reasons - expandable */}
              {primaryFiling.is_primary_match &&
               primaryFiling.match_reasons &&
               primaryFiling.match_reasons.length > 0 && (
                <div className="text-sm">
                  <button
                    onClick={() => setReasonsOpen(!reasonsOpen)}
                    className="flex items-center gap-2 text-xs mb-2 transition-colors"
                    style={{ color: colors.secondaryText }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryText)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondaryText)}
                  >
                    <span>{reasonsOpen ? '▼' : '▶'}</span>
                    <span>Match reasons</span>
                  </button>
                  {reasonsOpen && (
                    <ul style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '12px',
                      color: '#585862',
                      lineHeight: '1.8',
                    }}>
                      {primaryFiling.match_reasons.map((reason, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* Date Filed and Expires */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs" style={{ color: colors.secondaryText }}>
                    Date Filed:
                  </span>
                  <span className="ml-2" style={{ color: colors.primaryText }}>
                    {primaryFiling['Date Filed']}
                  </span>
                </div>
                <div>
                  <span className="text-xs" style={{ color: colors.secondaryText }}>
                    Expires:
                  </span>
                  <span className="ml-2" style={{ color: colors.primaryText }}>
                    {primaryFiling.Expires}
                  </span>
                </div>
              </div>

              {/* Secured Party */}
              <div className="text-sm">
                <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                  Secured Party:
                </div>
                <div style={{ color: colors.primaryText }}>
                  {primaryFiling.secured_parties.map((party, i) => (
                    <div key={i}>{extractName(party.raw)}</div>
                  ))}
                </div>
              </div>

              {/* Debtor Party */}
              <div className="text-sm">
                <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                  Debtor Party:
                </div>
                <div style={{ color: colors.primaryText }}>
                  {primaryFiling.debtor_parties.map((party, i) => (
                    <div key={i}>{extractName(party.raw)}</div>
                  ))}
                </div>
              </div>

              {/* Collateral */}
              {primaryFiling._ocr_success && primaryFiling.collateral ? (
                <div className="text-sm">
                  <button
                    onClick={() => setCollateralExpanded(!collateralExpanded)}
                    className="flex items-center gap-2 text-xs mb-2 transition-colors"
                    style={{ color: colors.secondaryText }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = colors.primaryText)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondaryText)}
                  >
                    <span>{collateralExpanded ? '▼' : '▶'}</span>
                    <span>Collateral</span>
                  </button>
                  {collateralExpanded && (
                    <pre
                      className="text-xs p-3 rounded max-h-[150px] overflow-y-auto whitespace-pre-wrap"
                      style={{
                        backgroundColor: colors.innerCardBg,
                        border: `1px solid ${colors.cardBorder}`,
                        color: colors.secondaryText,
                      }}
                    >
                      {primaryFiling.collateral}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="text-sm">
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Collateral:
                  </div>
                  <div className="italic" style={{ color: colors.muted }}>
                    Not extracted
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
