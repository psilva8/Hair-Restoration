import { ImageResponse } from 'next/og';

export const alt = 'Top Hair Transplant in Los Angeles';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image({ params }: { params: { city: string } }) {
  // Capital case the city name for display
  const cityName = params.city
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          padding: 20,
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 'bold', color: '#1E40AF', marginBottom: 20 }}>
          Top Hair Transplant in Los Angeles
        </div>
        <div style={{ fontSize: 40, color: '#4B5563' }}>
          {cityName} Area
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 