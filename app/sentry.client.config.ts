import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,        // Perf (baisse si trop verbeux)
  replaysSessionSampleRate: 0.1, // Replay 10% des sessions
  replaysOnErrorSampleRate: 1.0, // 100% si erreur
});
