import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const sb = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE ?? '',
    { auth: { persistSession: false } }
  );

// GET /api/leads  → test rapide que la route existe
export function GET() {
  return NextResponse.json({ ok: true, where: 'leads' });
}

// POST /api/leads  → enregistre un email dans la table "leads"
export async function POST(req: Request) {
  try {
    const { email, source } = await req.json();

    const valid =
      typeof email === 'string' &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      return NextResponse.json(
        { ok: false, error: 'Email invalide' },
        { status: 400 }
      );
    }

    const { error } = await sb()
      .from('leads')
      .insert({ email, source: (source ?? 'landing').slice(0, 50) });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Bad request' },
      { status: 400 }
    );
  }
}
