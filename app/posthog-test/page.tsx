'use client';
import { useState } from 'react';
import posthog from 'posthog-js';

export default function PostHogTest() {
  const [ok, setOk] = useState(false);
  return (
    <main style={{ padding: 24 }}>
      <h1>PostHog test</h1>
      <button
        onClick={() => { posthog.capture('cta_clicked', { page: 'posthog-test' }); setOk(true); setTimeout(()=>setOk(false), 1500); }}
        style={{ padding: '12px 16px', border: '1px solid #ccc', cursor: 'pointer' }}
      >
        Test PostHog
      </button>
      {ok && <p>✅ Événement envoyé</p>}
    </main>
  );
}
