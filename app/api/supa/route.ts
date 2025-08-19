export async function GET() {
  const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasAnon = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const hasRole = !!process.env.SUPABASE_SERVICE_ROLE;
  return new Response(JSON.stringify({ hasUrl, hasAnon, hasRole }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
