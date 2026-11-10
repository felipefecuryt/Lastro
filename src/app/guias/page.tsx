import type { Metadata } from "next";
import Link from "next/link";
import { GUIAS } from "@/lib/guias";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Guias sobre NR-1 e risco psicossocial",
  description:
    "Guias em linguagem simples sobre a NR-1, riscos psicossociais, PGR, CIPA e a decisão do STF — sempre com a fonte oficial citada.",
};

export default function GuiasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Guias</h1>
      <p className="mt-3 max-w-2xl text-casco/75">
        As dúvidas que todo dono de empresa tem sobre a NR-1 psicossocial,
        respondidas em linguagem simples e com a norma citada. Sem juridiquês e
        sem terrorismo de multa.
      </p>
      <LinhaDeCarga className="mt-8" />
      <div className="mt-8 space-y-4">
        {GUIAS.map((g) => (
          <Link
            key={g.slug}
            href={`/guias/${g.slug}`}
            className="block rounded-sm border border-nevoa bg-white p-6 transition-colors hover:border-mar"
          >
            <h2 className="text-2xl">{g.titulo}</h2>
            <p className="mt-2 text-sm text-casco/75">{g.resumo}</p>
            <p className="mt-3 text-xs text-casco/50">
              Atualizado em{" "}
              {new Date(`${g.atualizadoEm}T12:00:00`).toLocaleDateString("pt-BR")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
