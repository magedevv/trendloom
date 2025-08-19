export async function GET() {
  const v = process.env.NEXT_PUBLIC_APP_URL || null;
  const keys = Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC'));
  return new Response(JSON.stringify({ value: v, nextPublicKeys: keys }, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}
