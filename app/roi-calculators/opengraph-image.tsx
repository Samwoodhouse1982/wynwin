import { ImageResponse } from 'next/og';

// No `runtime = 'edge'` here: the image is constant, so letting it prerender
// at build time serves social crawlers a static file instead of invoking a
// function on every request.
export const alt = 'ROI calculators for healthtech — WYN WIN';
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
        <div style={{ width: 56, height: 6, background: '#E8006A', borderRadius: 3, marginBottom: 40 }} />
        <div style={{ fontSize: 26, color: '#E8006A', fontWeight: 700, letterSpacing: '1px', marginBottom: 20 }}>
          ROI CALCULATORS FOR HEALTHTECH
        </div>
        <div style={{ fontSize: 62, fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: 24, lineHeight: 1.1, maxWidth: 950 }}>
          Put a number on your value that finance will believe.
        </div>
        <div style={{ marginTop: 40, fontSize: 24, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>
          WYN WIN · wynwin.co.uk
        </div>
      </div>
    ),
    { ...size },
  );
}
