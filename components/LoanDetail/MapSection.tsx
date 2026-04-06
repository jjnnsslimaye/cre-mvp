'use client';

import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

interface MapSectionProps {
  lat: number | null;
  lng: number | null;
  label: string;
  address: string;
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

export default function MapSection({ lat, lng, label, address }: MapSectionProps) {
  const hasCoordinates = lat != null && lng != null && !isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0);

  console.log('MapSection debug:', { lat, lng, hasCoordinates, label, address });

  return (
    <div
      className="shadow-sm h-full flex flex-col overflow-hidden"
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
        Property & Location
      </h2>

      <div className="p-6 space-y-3">
        <div>
          <div className="text-xs mb-1" style={{ color: colors.secondaryText, fontWeight: 400 }}>
            Property Address (Principal Address Proxy)
          </div>
          <div style={{ color: colors.primaryText, fontWeight: 500 }}>{address}</div>
        </div>

        {hasCoordinates && lat !== null && lng !== null ? (
          <div style={{ height: '400px' }}>
            <MapView lat={lat} lng={lng} label={label} />
          </div>
        ) : (
          <div
            className="w-full rounded-lg flex items-center justify-center text-sm"
            style={{
              backgroundColor: colors.innerCardBg,
              color: colors.muted,
              minHeight: '400px',
            }}
          >
            Location data unavailable
          </div>
        )}
      </div>
    </div>
  );
}
