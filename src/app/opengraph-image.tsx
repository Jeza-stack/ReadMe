import { ImageResponse } from 'next/og';

// Site-wide link-preview card (WhatsApp, LinkedIn, Twitter). Generated at build
// time by next/og — no static asset to maintain.
export const alt = 'ReadMe — English Literature, Language & AI Literacy';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #021A42 0%, #043370 55%, #00A2C9 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 40, color: '#7DD3FC', letterSpacing: 6 }}>README</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 24 }}>
          Your courses. Your guides. One place.
        </div>
        <div style={{ fontSize: 32, color: '#CBD5E1', marginTop: 32 }}>
          English Literature · CEFR English · AI Literacy — free, built by a lecturer
        </div>
      </div>
    ),
    size,
  );
}
