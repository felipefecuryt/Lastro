import { NextResponse } from "next/server";

/**
 * Lista de espera — fase 0.
 *
 * TODO (fase 1): persistir de verdade. Opções, na ordem recomendada:
 *   1. Resend (e-mail de confirmação + audiência) — process.env.RESEND_API_KEY
 *   2. Supabase (tabela `leads`) quando o banco entrar
 * Até lá, o lead aparece no log do servidor (Vercel → Logs).
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { email, contexto } =
    typeof body === "object" && body !== null
      ? (body as { email?: unknown; contexto?: unknown })
      : {};

  if (typeof email !== "string" || !email.includes("@") || email.length > 200) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.log(
    `[lead] ${new Date().toISOString()} contexto=${String(contexto ?? "desconhecido").slice(0, 50)} email=${email}`,
  );

  return NextResponse.json({ ok: true });
}
