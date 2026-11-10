import { Suspense } from "react";
import type { Metadata } from "next";
import { Assistente } from "./assistente";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito de obrigação (NR-1)",
  description:
    "Responda 4 perguntas e descubra o que a NR-1 exige da sua empresa em riscos psicossociais: PGR, CIPA, canal de denúncia e multas.",
};

export default function DiagnosticoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">
        O que a NR-1 exige da sua empresa?
      </h1>
      <p className="mt-3 text-casco/75">
        Quatro perguntas, dois minutos. Sem cadastro. O resultado cita a norma e
        vem com link para a fonte oficial.
      </p>
      <Suspense>
        <Assistente />
      </Suspense>
    </div>
  );
}
