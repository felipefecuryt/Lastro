import type { Metadata } from "next";
import Link from "next/link";
import { diagnosticar } from "@/lib/rules/diagnostico";
import { setorPorId } from "@/lib/rules/setores";
import type { EntradaDiagnostico, FaixaEmpregados, GrauRisco } from "@/lib/rules/tipos";
import { LeadForm } from "@/components/lead-form";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Resultado do diagnóstico",
  robots: { index: false },
};

function lerEntrada(sp: Record<string, string | string[] | undefined>): EntradaDiagnostico {
  const v = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const temClt = v("clt") === "sim";
  const faixa = v("faixa") as FaixaEmpregados | undefined;
  const setorParam = v("setor") ?? "";
  let grauRisco: GrauRisco | undefined;
  let grauEstimado = false;
  if (setorParam.startsWith("grau-")) {
    const g = Number(setorParam.slice(5));
    if (g >= 1 && g <= 4) grauRisco = g as GrauRisco;
  } else {
    const s = setorPorId(setorParam);
    if (s) {
      grauRisco = s.grauEstimado;
      grauEstimado = true;
    }
  }
  return { temClt, faixa, grauRisco, grauEstimado, simples: v("simples") === "sim" };
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-nevoa pt-6 first:border-t-0 first:pt-0">
      <h2 className="text-xl">{titulo}</h2>
      <div className="mt-3 space-y-3 text-casco/85">{children}</div>
    </section>
  );
}

export default async function ResultadoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const entrada = lerEntrada(sp);
  const r = diagnosticar(entrada);
  const setor = typeof sp.setor === "string" ? setorPorId(sp.setor) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">

      {/* Veredito */}
      <h1 className="text-4xl sm:text-5xl">
        {r.aplicavel
          ? "Sim: sua empresa precisa gerenciar risco psicossocial."
          : "Hoje, a NR-1 não se aplica à sua empresa como empregadora."}
      </h1>
      {r.aplicavel && (
        <p className="mt-3 text-casco/75">
          Toda empresa com empregado CLT está obrigada desde 26/05/2026,
          independentemente do porte. Abaixo, o que isso significa no seu caso
          {setor ? ` (${setor.rotulo.toLowerCase()})` : ""}.
        </p>
      )}

      <LinhaDeCarga className="mt-8" />

      <div className="mt-8 space-y-8">
        {r.aplicavel && (
          <Bloco titulo="Avaliação de riscos psicossociais">
            <p>
              Você precisa identificar e avaliar fatores como sobrecarga,
              assédio, falta de autonomia e relação com lideranças, registrar
              isso por escrito e definir medidas de prevenção — com participação
              dos trabalhadores.
            </p>
          </Bloco>
        )}

        {r.aplicavel && r.pgr && (
          <Bloco titulo="Situação provável do PGR">
            <p>
              {r.pgr === "completo" &&
                "Pelo que você informou, o caminho é o PGR completo: inventário de riscos (incluindo os psicossociais) e plano de ação."}
              {r.pgr === "simplificado-possivel" &&
                "Pelo que você informou, sua empresa provavelmente pode usar as versões simplificadas previstas para ME/EPP de grau de risco 1 e 2 — detalhes nas ressalvas abaixo."}
              {r.pgr === "dispensa-possivel" &&
                "Pelo que você informou, pode haver dispensa de elaborar o PGR — mas ela não elimina a gestão do risco psicossocial. Veja as ressalvas."}
            </p>
          </Bloco>
        )}

        {r.aplicavel && (
          <Bloco titulo="CIPA e canal de denúncia">
            {r.cipa.obrigatoria ? (
              <>
                <p>
                  Com o seu número de funcionários e grau de risco, a CIPA é
                  obrigatória — e com ela vêm as obrigações da Lei 14.457/2022:
                  regras de conduta sobre assédio, canal de denúncia com
                  anonimato, procedimento de apuração e treinamento de todos os
                  níveis a cada 12 meses.
                </p>
              </>
            ) : (
              <p>
                Na sua faixa, a CIPA ainda não é exigida
                {r.cipa.limiar ? ` (passa a ser a partir de ${r.cipa.limiar} funcionários para o seu grau de risco)` : ""}
                . Sem CIPA, as obrigações específicas da Lei 14.457/2022 não se
                aplicam — mas prevenir assédio continua sendo dever geral.
              </p>
            )}
          </Bloco>
        )}

        {r.aplicavel && (
          <Bloco titulo="O risco de não fazer">
            <p>
              A ausência de avaliação é infração grave:{" "}
              <span className="tnum font-semibold">
                R$ {r.multa.minPorTrabalhador.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>{" "}
              a{" "}
              <span className="tnum font-semibold">
                R$ {r.multa.maxPorTrabalhador.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>{" "}
              por trabalhador exposto.
            </p>
            {r.multa.suspensaoStf && (
              <p className="rounded-sm bg-white border-l-4 border-zarcao p-3 text-casco">
                Atenção ao detalhe que quase ninguém explica: o STF suspendeu
                temporariamente as multas (ADPF 1316), mas a obrigação continua
                em vigor — e a falta de gestão segue sendo usada como prova em
                ações trabalhistas. Suspensão de multa não é suspensão de risco.
              </p>
            )}
          </Bloco>
        )}

        {r.ressalvas.length > 0 && (
          <Bloco titulo={r.aplicavel ? "Ressalvas importantes" : "O que você precisa saber mesmo assim"}>
            <ul className="list-disc space-y-2 pl-5">
              {r.ressalvas.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Bloco>
        )}

        <Bloco titulo="O que fazer agora">
          <ol className="list-decimal space-y-2 pl-5">
            {r.aplicavel ? (
              <>
                <li>
                  Confirme com seu contador o grau de risco oficial (CNAE ×
                  Quadro I da NR-4) e o enquadramento ME/EPP.
                </li>
                <li>
                  Faça o levantamento preliminar de perigos e registre: é ele
                  que define se cabe versão simplificada ou dispensa.
                </li>
                <li>
                  Estruture a consulta aos trabalhadores sobre percepção de
                  riscos — anônima e documentada. É exatamente isso que o Lastro
                  vai fazer por você.
                </li>
              </>
            ) : (
              <>
                <li>Se contratar o primeiro CLT, refaça este diagnóstico — as obrigações nascem no dia da contratação.</li>
                <li>Se você presta serviço como MEI dentro de empresas, saiba que o PGR delas deve incluir você.</li>
              </>
            )}
          </ol>
        </Bloco>

        {/* Fundamentos */}
        <section className="rounded-sm border border-mar-200 bg-espuma p-6">
          <h2 className="text-xl text-casco">Fundamentos, com fonte</h2>
          <ul className="mt-3 space-y-3 text-sm text-casco/85">
            {r.fundamentos.map((f) => (
              <li key={f.fonte}>
                <p>{f.texto}</p>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-mar-700 underline underline-offset-4 hover:text-casco"
                >
                  {f.fonte}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <LeadForm contexto="resultado-diagnostico" />

        <p className="text-center text-sm text-casco/60">
          Este diagnóstico é informativo e usa aproximações declaradas — não
          substitui contador, profissional de SST nem advogado.{" "}
          <Link href="/diagnostico" className="font-medium text-mar-700 hover:underline">
            Refazer diagnóstico
          </Link>
        </p>
      </div>
    </div>
  );
}
