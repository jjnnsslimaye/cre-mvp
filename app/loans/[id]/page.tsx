import { notFound } from 'next/navigation';
import { getLoanById } from '@/lib/loadData';
import UCCSection from '@/components/LoanDetail/UCCSection';
import ContactsSection from '@/components/LoanDetail/ContactsSection';
import MapSection from '@/components/LoanDetail/MapSection';
import LoanDetailHeader from '@/components/LoanDetailHeader';

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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

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

export default async function LoanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loan = await getLoanById(id);

  if (!loan) {
    notFound();
  }

  const borrowers = loan.borrowers.split(',').map(b => b.trim());
  const lenders = loan.lenders.split(',').map(l => l.trim());

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <LoanDetailHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* SECTIONS 1 & 3 — Loan Overview + Property & Location (Side by Side) */}
        <div className="flex gap-12" style={{ minHeight: '500px' }}>
          {/* Left: Loan Overview (20% width) */}
          <section className="w-1/5 flex-shrink-0 flex flex-col">
            <div
              className="rounded-xl shadow-sm flex-1 overflow-hidden"
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
                Loan Overview
              </h2>
              <div className="p-6 space-y-4">
              <div className="flex flex-col gap-2">
                <div
                  className="text-3xl font-bold"
                  style={{ color: colors.primaryText }}
                >
                  {formatCurrency(loan.loan_amount)}
                </div>
                <span
                  className="inline-block px-2 py-0.5 rounded-full font-semibold w-fit"
                  style={{ ...getUrgencyBadgeStyle(loan.loan_urgency), fontSize: '0.65rem' }}
                >
                  {loan.loan_urgency}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Doc Number
                  </div>
                  <div style={{ color: colors.primaryText }}>{loan.doc_number}</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Origination Date
                  </div>
                  <div style={{ color: colors.primaryText }}>{loan.record_date}</div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Doc Type
                  </div>
                  <div style={{ color: colors.primaryText }}>{loan.doc_type}</div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Borrower(s)
                  </div>
                  <div className="space-y-1" style={{ color: colors.primaryText }}>
                    {borrowers.map((b, i) => (
                      <div key={i}>{b}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Lender(s)
                  </div>
                  <div className="space-y-1" style={{ color: colors.primaryText }}>
                    {lenders.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Doc Stamps
                  </div>
                  <div style={{ color: colors.primaryText }}>
                    {formatCurrency(loan.doc_stamps)}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1" style={{ color: colors.secondaryText }}>
                    Intangible Tax
                  </div>
                  <div style={{ color: colors.primaryText }}>
                    {formatCurrency(loan.intangible_tax)}
                  </div>
                </div>
              </div>
              </div>
            </div>
          </section>

          {/* Right: Property & Location (remaining width) */}
          <section className="flex-1 flex flex-col min-w-0">
            <MapSection
              lat={loan.geocoding_data?.property_address?.coordinates?.latitude ?? null}
              lng={loan.geocoding_data?.property_address?.coordinates?.longitude ?? null}
              label={loan.geocoding_data?.property_address?.standardized_address?.full ?? 'Address unavailable'}
              address={loan.geocoding_data?.property_address?.standardized_address?.full ?? 'Address unavailable'}
            />
          </section>
        </div>

        {/* SECTION 2 — UCC Filings */}
        <UCCSection uccFilings={loan.ucc_filings} />

        {/* SECTION 4 — Contacts */}
        <ContactsSection
          sunbizData={loan.sunbiz_data}
          skipTraceData={loan.skip_trace_data}
        />
      </main>
    </div>
  );
}
