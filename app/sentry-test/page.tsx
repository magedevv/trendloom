'use client';

export default function SentryTest() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Sentry test</h1>
      <button
        onClick={() => {
          // Erreur volontaire côté client
          throw new Error('Test Sentry client error');
        }}
        style={{ padding: '12px 16px', border: '1px solid #ccc', cursor: 'pointer' }}
      >
        Provoquer une erreur client
      </button>
    </main>
  );
}
