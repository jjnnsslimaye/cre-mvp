import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

const colors = {
  navBg: '#123B56',
  heroBg: 'linear-gradient(328.46deg, #2781BC 3.13%, #123B56 43.55%)',
  featuresBg: '#FFFFFF',
  ctaCardBg: '#F3F7FF',
  primaryText: '#262832',
  secondaryText: '#585862',
  accentCyan: '#65CCE6',
  white: '#FFFFFF',
  black: '#000000',
};

export default async function Home() {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get('maturefi_tier');

  return (
    <div style={{ backgroundColor: colors.featuresBg }}>
      {/* SECTION 1 — NAVBAR */}
      <nav
        className="px-5 py-4 md:px-24 md:py-5"
        style={{
          backgroundColor: colors.navBg,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: MatuReFi wordmark */}
        <div
          className="text-[22px] md:text-[30px]"
          style={{
            fontWeight: 700,
            color: colors.white,
          }}
        >
          MatuReFi
        </div>

        {/* Right: Navigation buttons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {!isAuthenticated && (
            <Link
              href="/login"
              className="px-3 py-1 md:px-8 md:py-0 md:h-12 text-sm md:text-base"
              style={{
                backgroundColor: colors.white,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: colors.navBg,
                textDecoration: 'none',
              }}
            >
              Login
            </Link>
          )}

          <Link
            href="/loans"
            className="hidden md:flex"
            style={{
              backgroundColor: colors.accentCyan,
              borderRadius: '4px',
              padding: '0px 32px',
              height: '48px',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '16px',
              color: colors.black,
              textDecoration: 'none',
            }}
          >
            Find ReFi Deals →
          </Link>
        </div>
      </nav>

      {/* SECTION 2 — ABOVE THE FOLD (Hero) */}
      <section
        className="pt-8 pb-16 px-5 md:pt-[100px] md:pb-[100px] md:px-0 min-h-screen md:min-h-[850px]"
        style={{
          background: colors.heroBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Hero inner container */}
        <div
          className="flex flex-col md:flex-row gap-10 md:gap-[60px]"
          style={{
            alignItems: 'center',
            maxWidth: '1200px',
            padding: '0 20px',
          }}
        >
          {/* LEFT COLUMN (copy) */}
          <div style={{ flex: '1 1 auto', minWidth: '300px' }}>
            {/* Headline */}
            <h1
              className="text-[32px] md:text-[42px]"
              style={{
                fontWeight: 700,
                color: colors.white,
                lineHeight: '120%',
                margin: 0,
              }}
            >
              The fastest way to find refinancing deals in CRE
            </h1>

            {/* Explainer */}
            <p
              className="text-[15px] md:text-lg"
              style={{
                fontWeight: 400,
                color: colors.white,
                lineHeight: '120%',
                marginTop: '14px',
              }}
            >
              Our free-to-access platform makes it easy for lenders to find borrowers with maturing loans in commercial real estate.
            </p>

            {/* Bullet points */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Bullet 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="#65CCE6" />
                  <path
                    d="M8 14l4 4 8-8"
                    stroke="#123B56"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ fontWeight: 400, fontSize: '16px', color: colors.white }}>
                  Only pay when you do deals
                </span>
              </div>

              {/* Bullet 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="#65CCE6" />
                  <path
                    d="M8 14l4 4 8-8"
                    stroke="#123B56"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ fontWeight: 400, fontSize: '16px', color: colors.white }}>
                  Loans ranked by urgency signal
                </span>
              </div>

              {/* Bullet 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="14" fill="#65CCE6" />
                  <path
                    d="M8 14l4 4 8-8"
                    stroke="#123B56"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span style={{ fontWeight: 400, fontSize: '16px', color: colors.white }}>
                  Backed by UCC filings & county records
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (product mockup) */}
          <div className="hidden md:flex" style={{ flex: '0 0 500px', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '525px',
                height: '590px',
                flexShrink: 0,
              }}
            >
              {/* Layer 1 — Loan Overview (back, left, slightly down) */}
              <Image
                src="/screenshots/heropage-loan-details-BLUR.jpeg"
                alt="Loan overview"
                width={213}
                height={380}
                style={{
                  position: 'absolute',
                  left: '-18px',
                  top: '10px',
                  borderRadius: '14px',
                  boxShadow: '-2px -2px 10px rgba(255,255,255,0.05), 0px 20px 40px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              />

              {/* Layer 2 — Skip Trace card (middle, right of loan card, overlapping) */}
              <Image
                src="/screenshots/heropage-skiptrace-BLUR.jpeg"
                alt="Contact intelligence"
                width={400}
                height={323}
                style={{
                  position: 'absolute',
                  left: '108px',
                  top: '96px',
                  borderRadius: '14px',
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.2)',
                  zIndex: 2,
                }}
              />

              {/* Layer 3 — Phone row closeup (front, overlapping bottom of skiptrace) */}
              <Image
                src="/screenshots/heropage-phone-BLUR.jpeg"
                alt="Phone number detail"
                width={350}
                height={80}
                style={{
                  position: 'absolute',
                  left: '-45px',
                  top: '300px',
                  transform: 'scale(1.65)',
                  transformOrigin: 'top left',
                  borderRadius: '10px',
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.25)',
                  zIndex: 3,
                }}
              />
            </div>
          </div>
        </div>

        {/* Below columns: CTA button + sub-text */}
        <div
          style={{
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Link
            href="/loans"
            className="w-full md:w-auto"
            style={{
              backgroundColor: colors.accentCyan,
              borderRadius: '4px',
              padding: '0px 32px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '16px',
              color: colors.black,
              textDecoration: 'none',
            }}
          >
            Find ReFi Deals →
          </Link>

          <p
            style={{
              fontWeight: 400,
              fontSize: '17px',
              color: colors.white,
              letterSpacing: '-0.45px',
              margin: 0,
            }}
          >
            No signup required. Explore free.
          </p>
        </div>
      </section>

      {/* SECTION 3 — FEATURES */}
      <section
        className="px-5 pt-24 pb-10 md:px-[170px] md:py-20 gap-6 md:gap-[60px]"
        style={{
          backgroundColor: colors.featuresBg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Section headline */}
        <h2
          className="text-[26px] leading-tight md:text-4xl md:leading-[130%]"
          style={{
            fontWeight: 700,
            textAlign: 'center',
            margin: 0,
            marginBottom: 'clamp(32px, 6vw, 60px)',
          }}
        >
          <span style={{ color: colors.primaryText }}>
            $875B+ of CRE loans will mature in 2026.
          </span>
          <br />
          <span style={{ color: colors.accentCyan }}>
            Find the borrowers who need you now.
          </span>
        </h2>

        {/* FEATURE CARD 1 */}
        <div
          className="flex flex-col md:flex-row gap-10 p-6 md:p-[60px] md:px-[100px]"
          style={{
            backgroundColor: colors.white,
            borderRadius: '40px',
            alignItems: 'center',
            maxWidth: '1276px',
            width: '100%',
          }}
        >
          {/* Left (copy) */}
          <div className="w-full md:w-[470px]" style={{ flex: '0 0 auto' }}>
            <h3
              className="text-xl md:text-[26px]"
              style={{
                fontWeight: 500,
                color: colors.primaryText,
                letterSpacing: '-0.45px',
                margin: 0,
              }}
            >
              See the loans you want
            </h3>
            <p
              style={{
                fontWeight: 400,
                fontSize: '18px',
                color: colors.secondaryText,
                lineHeight: '24px',
                marginTop: '16px',
              }}
            >
              Whether you want active or distressed, office or multifamily,
              it's easy to filter loans by type, lender, amount, location, and
              estimated maturity date.
            </p>
          </div>

          {/* Right (mockup placeholder) */}
          <div className="hidden md:block" style={{ flex: 1, minWidth: '300px', overflow: 'visible' }}>
            {/* FEATURE 1 — feature1-loan-table.png + feature1-urgency.png */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '280px',
                flex: 1,
                overflow: 'visible',
              }}
            >
              {/* Layer 1 — Loan table (back, top-right, larger) */}
              <Image
                src="/screenshots/feature1-loan-table-BLUR.jpeg"
                alt="Loan table with filters"
                width={800}
                height={400}
                style={{
                  position: 'absolute',
                  right: '-60px',
                  top: '-20px',
                  width: '140%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0px 16px 32px rgba(0,0,0,0.12)',
                  zIndex: 1,
                }}
              />

              {/* Layer 2 — Urgency definitions (front, bottom-left, smaller) */}
              <Image
                src="/screenshots/feature1-urgency.png"
                alt="Urgency definitions"
                width={400}
                height={200}
                style={{
                  position: 'absolute',
                  left: '0px',
                  bottom: '20px',
                  width: '45%',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0px 16px 32px rgba(0,0,0,0.18)',
                  zIndex: 2,
                }}
              />
            </div>
          </div>
        </div>

        {/* FEATURE CARD 2 */}
        <div
          className="flex flex-col md:flex-row gap-10 p-6 md:p-[60px] md:px-[100px]"
          style={{
            backgroundColor: colors.white,
            borderRadius: '40px',
            alignItems: 'center',
            maxWidth: '1276px',
            width: '100%',
          }}
        >
          {/* Left (copy) */}
          <div className="w-full md:w-[470px]" style={{ flex: '0 0 auto' }}>
            <h3
              className="text-xl md:text-[26px]"
              style={{
                fontWeight: 500,
                color: colors.primaryText,
                letterSpacing: '-0.45px',
                margin: 0,
              }}
            >
              Get the latest borrower data
            </h3>
            <p
              style={{
                fontWeight: 400,
                fontSize: '16px',
                color: colors.secondaryText,
                lineHeight: '24px',
                marginTop: '16px',
              }}
            >
              All loan data is refreshed weekly with updates from UCC filings &
              county records, plus borrower contact info when you're ready to
              start talking.
            </p>
          </div>

          {/* Right (mockup placeholder) */}
          <div className="hidden md:block" style={{ flex: 1, minWidth: '300px' }}>
            {/* FEATURE 2 — feature2-map.png + feature2-contacts.png + feature2-ucc.png */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                overflow: 'visible',
              }}
            >
              {/* Layer 1 — Map (back, largest, top-left) */}
              <Image
                src="/screenshots/feature2-map-BLUR.jpeg"
                alt="Property map with location"
                width={800}
                height={400}
                style={{
                  position: 'absolute',
                  left: '15px',
                  top: '0px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0px 16px 32px rgba(0,0,0,0.12)',
                  zIndex: 1,
                }}
              />

              {/* Layer 2 — Contacts (middle, bottom-right) */}
              <Image
                src="/screenshots/feature2-contacts-BLUR.jpeg"
                alt="Contact information"
                width={800}
                height={400}
                style={{
                  position: 'absolute',
                  right: '-55px',
                  bottom: '60px',
                  width: '83%',
                  height: 'auto',
                  borderRadius: '12px',
                  boxShadow: '0px 16px 32px rgba(0,0,0,0.16)',
                  zIndex: 2,
                }}
              />

              {/* Layer 3 — UCC (front, center-left, straddling layers 1 and 2) */}
              <Image
                src="/screenshots/feature2-ucc-BLUR.jpeg"
                alt="UCC filings detail"
                width={800}
                height={400}
                style={{
                  position: 'absolute',
                  left: '-20px',
                  top: '47%',
                  transform: 'translateY(-50%)',
                  width: '80%',
                  height: 'auto',
                  borderRadius: '10px',
                  boxShadow: '0px 16px 32px rgba(0,0,0,0.20)',
                  zIndex: 3,
                }}
              />
            </div>
          </div>
        </div>

        {/* FEATURE CARD 3 */}
        <div
          className="flex flex-col md:flex-row gap-10 p-6 md:p-[60px] md:px-[100px]"
          style={{
            backgroundColor: colors.white,
            borderRadius: '40px',
            alignItems: 'center',
            maxWidth: '1276px',
            width: '100%',
          }}
        >
          {/* Left (copy) */}
          <div className="w-full md:w-[470px]" style={{ flex: '0 0 auto' }}>
            <h3
              className="text-xl md:text-[26px]"
              style={{
                fontWeight: 500,
                color: colors.primaryText,
                letterSpacing: '-0.45px',
                margin: 0,
              }}
            >
              Only pay when you do deals
            </h3>
            <p
              style={{
                fontWeight: 400,
                fontSize: '16px',
                color: colors.secondaryText,
                lineHeight: '24px',
                marginTop: '16px',
              }}
            >
              Forget the SaaS subscription. You can start searching for
              borrowers with expiring loans for free, and pay a small
              transaction fee when the deal is done.
            </p>
          </div>

          {/* Right (mockup placeholder) */}
          <div className="hidden md:flex" style={{ flex: 1, minWidth: '300px', justifyContent: 'center' }}>
            <div
              style={{
                position: 'relative',
                width: '472px',
                height: '531px',
                flexShrink: 0,
              }}
            >
              {/* Layer 1 — Loan Overview (back, left, slightly down) */}
              <Image
                src="/screenshots/heropage-loan-details-BLUR.jpeg"
                alt="Loan overview"
                width={192}
                height={342}
                style={{
                  position: 'absolute',
                  left: '-16px',
                  top: '9px',
                  borderRadius: '14px',
                  boxShadow: '-2px -2px 10px rgba(255,255,255,0.05), 0px 20px 40px rgba(0,0,0,0.2)',
                  zIndex: 1,
                }}
              />

              {/* Layer 2 — Skip Trace card (middle, right of loan card, overlapping) */}
              <Image
                src="/screenshots/heropage-skiptrace-BLUR.jpeg"
                alt="Contact intelligence"
                width={360}
                height={291}
                style={{
                  position: 'absolute',
                  left: '97px',
                  top: '86px',
                  borderRadius: '14px',
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.2)',
                  zIndex: 2,
                }}
              />

              {/* Layer 3 — Phone row closeup (front, overlapping bottom of skiptrace) */}
              <Image
                src="/screenshots/heropage-phone-BLUR.jpeg"
                alt="Phone number detail"
                width={315}
                height={72}
                style={{
                  position: 'absolute',
                  left: '-40px',
                  top: '270px',
                  transform: 'scale(1.65)',
                  transformOrigin: 'top left',
                  borderRadius: '10px',
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.25)',
                  zIndex: 3,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — BOTTOM CTA CARD */}
      <div
        className="p-10 md:p-[60px] gap-6 md:gap-[40px] mt-24 md:mt-0 mx-auto mb-20"
        style={{
          maxWidth: '1112px',
          width: '100%',
          backgroundColor: colors.ctaCardBg,
          boxShadow: '0px 42px 42px rgba(0, 66, 110, 0.16)',
          borderRadius: 'clamp(20px, 5vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Headline */}
        <div style={{ textAlign: 'center' }}>
          <div
            className="text-2xl md:text-[36px]"
            style={{
              fontWeight: 700,
              color: colors.primaryText,
            }}
          >
            Ready to take a closer look?
          </div>
          <div
            className="text-2xl md:text-[36px]"
            style={{
              fontWeight: 700,
              color: colors.accentCyan,
              marginBottom: '8px',
            }}
          >
            Explore the data now.
          </div>
        </div>

        {/* CTA button + sub-text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Link
            href="/loans"
            className="w-full md:w-auto"
            style={{
              backgroundColor: colors.accentCyan,
              borderRadius: '4px',
              padding: '0px 32px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '16px',
              color: colors.black,
              textDecoration: 'none',
            }}
          >
            Find ReFi Deals →
          </Link>

          <p
            style={{
              fontWeight: 400,
              fontSize: '17px',
              color: colors.black,
              letterSpacing: '-0.45px',
              margin: 0,
            }}
          >
            No signup required. Explore free.
          </p>
        </div>
      </div>
    </div>
  );
}
