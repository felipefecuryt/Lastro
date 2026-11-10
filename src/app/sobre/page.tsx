import type { Metadata } from "next";
import Link from "next/link";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Sobre o Lastro",
  description:
    "Por que o Lastro existe: 546 mil afastamentos por transtornos mentais em um ano, uma norma nova e milhões de pequenas empresas sem apoio.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Sobre o Lastro</h1>
      <LinhaDeCarga className="mt-8" />
      <div className="mt-6 space-y-5 leading-relaxed text-casco/85">
        <p>
          Em 2025, a Previdência concedeu 546.254 benefícios por transtornos
          mentais — o maior número da história. Atrás de cada um há uma pessoa
          que adoeceu, quase sempre devagar: meses de sobrecarga, metas
          impossíveis, chefia hostil, medo. A NR-1 passou a exigir que as
          empresas enxerguem isso antes de virar afastamento. É uma boa
          exigência. O problema é que as pequenas empresas — 4,8 milhões de
          estabelecimentos com empregados no Brasil — ficaram sozinhas com ela.
        </p>
        <p>
          O Lastro existe para esse espaço: a empresa de 10, 40, 150 pessoas,
          que não tem SESMT, não tem orçamento de consultoria e não quer um PDF
          genérico para inglês ver. O nome vem de &ldquo;lastro
          probatório&rdquo;: aquilo que sustenta uma afirmação quando alguém
          duvida dela. É o que a gente produz — prova de que a empresa olhou,
          agiu e mediu.
        </p>
        <p>
          Dois compromissos definem o produto. Com o trabalhador: anonimato
          garantido por arquitetura, não por promessa — a resposta é gravada sem
          vínculo com quem respondeu, e grupo pequeno nunca aparece. Com a
          empresa: nada de pânico de multa nem promessa de imunidade; o que
          entregamos é documentação séria, medição honesta e acompanhamento do
          que foi feito.
        </p>
        <p>
          O projeto está em construção aberta: o diagnóstico gratuito já
          funciona, os guias são atualizados a cada mudança normativa e a
          plataforma completa — pesquisa anônima, inventário, plano de ação e
          assinatura por responsável técnico — vem em seguida.
        </p>
      </div>
      <div className="mt-8">
        <Link
          href="/diagnostico"
          className="rounded-sm bg-mar px-5 py-3 font-semibold text-white hover:bg-mar-700"
        >
          Fazer o diagnóstico gratuito
        </Link>
      </div>
    </div>
  );
}
