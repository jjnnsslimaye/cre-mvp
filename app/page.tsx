import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';
import HeroAnimation from '@/components/HeroAnimation';
import Navbar from '@/components/Navbar';

const playfair = Playfair_Display({ subsets: ['latin'] });

// Color palette from Lottie animation
const colors = {
  background: '#f5fafc',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  accent: '#f0c811',
  lightBlueTint: '#dae6f1',
  midBlue: '#7cacdb',
  white: '#ffffff',
  footerText: '#92a6c2',
};

export default function Home() {
  return (
    <div style={{ backgroundColor: colors.background, minHeight: '100vh' }}>
      {/* SECTION 1 — NAV */}
      <Navbar />

      {/* SECTION 2 — HERO */}
      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column — Text */}
          <div className="space-y-6">
            <h2
              className="text-5xl md:text-6xl font-extrabold leading-tight"
              style={{ color: colors.primaryText }}
            >
              Distressed CRE
              <br />
              Loan{' '}
              <span style={{ color: colors.accent }}>Intelligence</span>
            </h2>

            <p
              className="text-lg md:text-xl"
              style={{ color: colors.secondaryText }}
            >
              Enriched loan data from public records, cross-referenced with UCC
              filings and skip-traced to the principal.
            </p>

            <div>
              <Link
                href="/loans"
                className="inline-block px-8 py-4 text-lg font-bold rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primaryText,
                }}
              >
                View Intelligence →
              </Link>
            </div>
          </div>

          {/* Right column — Animation */}
          <div className="flex justify-center items-center" style={{ minHeight: '400px' }}>
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section
        style={{ backgroundColor: colors.primaryText }}
        className="py-9 md:py-12"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-6 space-y-2">
            <h3
              className={`text-3xl md:text-4xl font-bold ${playfair.className}`}
              style={{ color: colors.white }}
            >
              How It Works
            </h3>
            <p
              className="text-base md:text-lg"
              style={{ color: colors.footerText }}
            >
              Public records, enriched end-to-end
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div
              className="rounded-lg p-5 shadow-sm"
              style={{
                backgroundColor: colors.white,
                borderLeft: `4px solid ${colors.accent}`,
              }}
            >
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: colors.primaryText }}
              >
                1. Public Record Scraping
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.secondaryText }}>
                Mortgage filings scraped directly from Broward County public
                records and cross-referenced against Florida UCC filings.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="rounded-lg p-5 shadow-sm"
              style={{
                backgroundColor: colors.white,
                borderLeft: `4px solid ${colors.accent}`,
              }}
            >
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: colors.primaryText }}
              >
                2. Entity Resolution
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.secondaryText }}>
                Borrowing entities resolved through Florida Division of
                Corporations to surface the real principals behind each LLC.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="rounded-lg p-5 shadow-sm"
              style={{
                backgroundColor: colors.white,
                borderLeft: `4px solid ${colors.accent}`,
              }}
            >
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: colors.primaryText }}
              >
                3. Contact Intelligence
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.secondaryText }}>
                Principals skip-traced to surface verified phone numbers,
                emails, and compliance flags for direct outreach.
              </p>
            </div>

            {/* Card 4 */}
            <div
              className="rounded-lg p-5 shadow-sm"
              style={{
                backgroundColor: colors.white,
                borderLeft: `4px solid ${colors.accent}`,
              }}
            >
              <h4
                className="text-lg font-bold mb-3"
                style={{ color: colors.primaryText }}
              >
                4. Geocoding
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: colors.secondaryText }}>
                Principal addresses geocoded and visualized on interactive maps
                to identify property locations and assess geographic risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FOOTER */}
      <footer
        style={{
          backgroundColor: colors.primaryText,
        }}
        className="py-6"
      >
        <div className="text-center text-sm" style={{ color: colors.footerText }}>
          © 2025 MatuReFi · Broward County, FL
        </div>
      </footer>
    </div>
  );
}
