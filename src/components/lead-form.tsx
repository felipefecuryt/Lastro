"use client";

import { useState } from "react";

/**
 * Captura de e-mail (lista de espera da plataforma).
 * Envia para /api/lead. Fase 0: o endpoint só registra no log do servidor —
 * trocar por Resend/planilha antes de divulgar (ver TODO na rota).
 */
export function LeadForm({ contexto }: { contexto: string }) {
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "erro">("idle");

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault();
    if (!email.includes("@")) return;
    setEstado("enviando");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contexto }),
      });
      setEstado(res.ok ? "ok" : "erro");
    } catch {
      setEstado("erro");
    }
  }

  if (estado === "ok") {
    return (
      <div className="rounded-sm border border-mar-200 bg-white p-6 text-center">
        <p className="font-semibold text-casco">Anotado!</p>
        <p className="mt-1 text-sm text-casco/75">
          Você será avisado quando a plataforma abrir — e só sobre isso.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviar}
      className="rounded-sm border border-nevoa bg-white p-6"
    >
      <h2 className="text-lg font-semibold">
        Quer que a gente faça isso com você?
      </h2>
      <p className="mt-1 text-sm text-casco/75">
        A plataforma do Lastro — pesquisa anônima, inventário e plano de ação
        assinados — está em construção. Deixe seu e-mail para entrar na lista.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="lead-email">
          Seu e-mail
        </label>
        <input
          id="lead-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com.br"
          className="min-h-11 flex-1 rounded-sm border border-nevoa px-4 text-base focus:border-mar focus:ring-2 focus:ring-mar-200 focus:outline-none"
        />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="min-h-11 rounded-sm bg-mar px-5 font-semibold text-white hover:bg-mar-700 disabled:opacity-60"
        >
          {estado === "enviando" ? "Enviando…" : "Entrar na lista"}
        </button>
      </div>
      {estado === "erro" && (
        <p className="mt-2 text-sm text-zarcao">
          Não foi possível enviar agora. Tente de novo em instantes.
        </p>
      )}
      <p className="mt-3 text-xs text-casco/60">
        Usamos seu e-mail só para este aviso. Nada de lista fria.{" "}
      </p>
    </form>
  );
}
