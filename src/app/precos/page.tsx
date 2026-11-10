import type { Metadata } from "next";
import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Preços",
  description:
    "Diagnóstico gratuito hoje; planos da plataforma a partir de R$ 97/mês no lançamento, por faixa de colaboradores.",
};

const PLANOS = [
  {
    nome: "Diagnóstico",
    preco: "Grátis",
    faixa: "qualquer empresa",
    itens: [
      "Diagnóstico de obrigação em 2 minutos",
      "Resultado com a norma citada e fonte oficial",
      "Compartilhável por link com seu contador",
    ],
    destaque: false,
    cta: { rotulo: "Fazer agora", href: "/diagnostico" },
  },
  {
    nome: "Essencial",
    preco: "R$ 97/mês",
    faixa: "até 30 colaboradores",
    itens: [
      "Pesquisa anônima por WhatsApp e link",
      "Inventário de riscos e plano de ação",
      "Documento assinado por responsável técnico",
      "1 ciclo por semestre",
    ],
    destaque: true,
    cta: null,
  },
  {
    nome: "Gestão",
    preco: "R$ 197/mês",
    faixa: "31 a 100 colaboradores",
    itens: [
      "Tudo do Essencial",
      "Ciclos ilimitados e cortes por setor",
      "Acompanhamento das ações com evidência",
      "Dossiê de defesa completo",
    ],
    destaque: false,
    cta: null,
  },
];

export default function PrecosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Preços</h1>
      <p className="mt-3 max-w-2xl text-casco/75">
        O diagnóstico é gratuito e sempre será. A plataforma completa está em
        construção — os valores abaixo são os de lançamento, garantidos para
        quem entrar na lista de espera.
      </p>
      <LinhaDeCarga className="mt-8" />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {PLANOS.map((p) => (
          <div
            key={p.nome}
            className={`flex flex-col rounded-sm border bg-white p-6 ${
              p.destaque ? "border-mar ring-2 ring-mar-200" : "border-nevoa"
            }`}
          >
            <h2 className="text-xl">{p.nome}</h2>
            <p className="tnum mt-1 font-display text-4xl sm:text-5xl text-mar-700">
              {p.preco}
            </p>
            <p className="text-sm text-casco/60">{p.faixa}</p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-casco/85">
              {p.itens.map((i) => (
                <li key={i} className="border-t border-nevoa pt-2">
                  {i}
                </li>
              ))}
            </ul>
            {p.cta ? (
              <Link
                href={p.cta.href}
                className="mt-6 rounded-sm bg-mar px-4 py-2.5 text-center font-semibold text-white hover:bg-mar-700"
              >
                {p.cta.rotulo}
              </Link>
            ) : (
              <p className="mt-6 rounded-sm bg-espuma px-4 py-2.5 text-center text-sm font-medium text-casco/60">
                Em breve — lista de espera abaixo
              </p>
            )}
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-casco/60">
        Acima de 100 colaboradores, ou para contadores e consultorias de SST com
        carteira de clientes: fale com a gente pela lista de espera que o
        contato é priorizado.
      </p>

      <div className="mt-8">
        <LeadForm contexto="precos" />
      </div>
    </div>
  );
}
