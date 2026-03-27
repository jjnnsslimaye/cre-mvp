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
  background: '#f5fafc',
  white: '#ffffff',
  lightBlueTint: '#dae6f1',
  primaryText: '#2b333f',
  secondaryText: '#5e7391',
  footerText: '#92a6c2',
};

export default function MapSection({ lat, lng, label, address }: MapSectionProps) {
  const hasCoordinates = lat != null && lng != null && (lat !== 0 || lng !== 0);

  return (
    <div
      className="rounded-xl shadow-sm h-full flex flex-col overflow-hidden"
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
        Property & Location
      </h2>
      {hasCoordinates ? (
        <div className="flex-1 p-6" style={{ minHeight: '400px' }}>
          <MapView lat={lat} lng={lng} label={label} />
        </div>
      ) : (
        <div className="flex-1 p-6">
          <div
            className="w-full h-full rounded-lg flex items-center justify-center text-sm"
            style={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.lightBlueTint}`,
              color: colors.footerText,
            }}
          >
            Location data unavailable
          </div>
        </div>
      )}
    </div>
  );
}
