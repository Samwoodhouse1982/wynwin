import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'WYN WIN — Services for busy people.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D1B3E',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ width: 56, height: 6, background: '#E8006A', borderRadius: 3, marginBottom: 48 }} />
        <div style={{ fontSize: 80, fontWeight: 900, color: 'white', letterSpacing: '-3px', marginBottom: 24, lineHeight: 1 }}>
          WYN WIN
        </div>
        <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.65)', maxWidth: 680, lineHeight: 1.45 }}>
          Services for busy people.
        </div>
        <div style={{ marginTop: 64, fontSize: 22, color: '#E8006A', fontWeight: 700, letterSpacing: '0.5px' }}>
          wynwin.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
