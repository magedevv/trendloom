'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    // petite validation côté client
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setStatus('err');
      setError('Email invalide');
      return;
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'landing' }),
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setStatus('ok');
        setEmail('');
      } else {
        setStatus('err');
        setError(json?.error ?? 'Erreur serveur');
      }
    } catch {
      setStatus('err');
      setError('Réseau indisponible');
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 560 }}>
      <h1 style={{ marginBottom: 8 }}>TrendLoom</h1>
      <p style={{ marginBottom: 24 }}>Bienvenue 👋 — inscris-toi pour être prévenu du lancement.</p>

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <label htmlFor="email" className="sr-only">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          placeholder="ton@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          style={{ flex: 1, padding: '10px 12px', border: '1px solid #ccc', borderRadius: 8 }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #222',
            background: '#111',
            color: 'white',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Envoi…' : 'Je m’inscris'}
        </button>
      </form>

      {status === 'ok' && (
        <p style={{ color: 'green', marginTop: 4 }}>✅ Merci, c’est bien enregistré !</p>
      )}
      {status === 'err' && (
        <p style={{ color: 'crimson', marginTop: 4 }}>❌ {error}</p>
      )}

      <hr style={{ margin: '24px 0' }} />
      <ul style={{ lineHeight: 1.9 }}>
        <li><a href="/posthog-test">Aller au test PostHog</a></li>
        <li><a href="/debug">Voir les variables publiques</a></li>
      </ul>
    </main>
  );
}
