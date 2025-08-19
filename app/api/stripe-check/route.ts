export async function GET() {
  const sk = process.env.STRIPE_SECRET_KEY || '';
  const ok = sk.startsWith('sk_');   // on vérifie juste le format
  return new Response(JSON.stringify({ hasSecretKey: ok }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
