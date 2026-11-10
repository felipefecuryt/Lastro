"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SETORES } from "@/lib/rules/setores";

/**
 * Assistente de 4 passos. Todo o estado vive na URL:
 * o resultado é compartilhável por link e o botão voltar do navegador funciona.
 */

const FAIXAS = ["1-9", "10-19", "20-50", "51-80", "81-300", "300+"] as const;

function Opcao({
  onClick,
  titulo,
  detalhe,
}: {
  onClick: () => void;
  titulo: string;
  detalhe?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-sm border border-nevoa bg-white px-5 py-4 text-left transition-colors hover:border-mar hover:bg-espuma focus-visible:ring-2 focus-visible:ring-mar focus-visible:outline-none"
    >
      <span className="block text-base font-semibold text-casco">
        {titulo}
      </span>
      {detalhe ? (
        <span className="mt-0.5 block text-sm text-casco/60">{detalhe}</span>
      ) : null}
    </button>
  );
}

export function Assistente() {
  const router = useRouter();
  const params = useSearchParams();

  const clt = params.get("clt"); // "sim" | "nao"
  const faixa = params.get("faixa");
  const setor = params.get("setor"); // id do setor OU "grau-N" manual
  // passo atual deriva do que já foi respondido
  const passo = !clt ? 1 : clt === "nao" ? 4 : !faixa ? 2 : !setor ? 3 : 4;

  function definir(chave: string, valor: string) {
    const p = new URLSearchParams(params.toString());
    p.set(chave, valor);
    router.push(`/diagnostico?${p.toString()}`);
  }

  function concluir(simples: "sim" | "nao" | "na") {
    const p = new URLSearchParams(params.toString());
    p.set("simples", simples);
    router.push(`/diagnostico/resultado?${p.toString()}`);
  }

  return (
    <div className="mt-8">
      {/* Progresso: as quatro perguntas, numeradas como marcas de calado */}
      <ol className="mb-8 flex items-end gap-6 border-b-2 border-casco pb-2" aria-label={`Pergunta ${passo} de 4`}>
        {[1, 2, 3, 4].map((n) => (
          <li
            key={n}
            aria-current={n === passo ? "step" : undefined}
            className={`font-display tnum text-3xl leading-none ${
              n === passo ? "text-mar" : n < passo ? "text-casco" : "text-casco/25"
            }`}
          >
            {n}
          </li>
        ))}
      </ol>

      {passo === 1 && (
        <section className="space-y-3">
          <h2 className="text-2xl">
            Sua empresa tem funcionário com carteira assinada (CLT)?
          </h2>
          <Opcao titulo="Sim" onClick={() => definir("clt", "sim")} />
          <Opcao
            titulo="Não"
            detalhe="Só MEI, sócios ou prestadores de serviço"
            onClick={() => definir("clt", "nao")}
          />
        </section>
      )}

      {passo === 2 && (
        <section className="space-y-3">
          <h2 className="text-2xl">Quantos funcionários CLT?</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {FAIXAS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => definir("faixa", f)}
                className="tnum rounded-sm border border-nevoa bg-white px-4 py-4 text-base font-semibold text-casco hover:border-mar hover:bg-espuma"
              >
                {f === "300+" ? "Mais de 300" : f.replace("-", " a ")}
              </button>
            ))}
          </div>
        </section>
      )}

      {passo === 3 && (
        <section className="space-y-3">
          <h2 className="text-2xl">
            Qual é a atividade principal da empresa?
          </h2>
          <p className="text-sm text-casco/60">
            Usamos a atividade para estimar o grau de risco (NR-4). Se você já
            sabe o seu grau, escolha no fim da lista.
          </p>
          {SETORES.map((s) => (
            <Opcao
              key={s.id}
              titulo={s.rotulo}
              detalhe={s.exemplos}
              onClick={() => definir("setor", s.id)}
            />
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {[1, 2, 3, 4].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => definir("setor", `grau-${g}`)}
                className="rounded-sm border border-dashed border-casco/40 bg-espuma px-3 py-3 text-sm font-semibold text-casco/85 hover:border-mar hover:bg-espuma"
              >
                Sei o grau: {g}
              </button>
            ))}
          </div>
        </section>
      )}

      {passo === 4 && clt === "nao" && (
        <section className="space-y-4">
          <h2 className="text-2xl">Quase lá</h2>
          <p className="text-casco/75">
            Sem funcionário CLT, o resultado é mais simples — mas tem um aviso
            importante sobre MEI que quase ninguém conhece.
          </p>
          <button
            type="button"
            onClick={() => concluir("na")}
            className="w-full rounded-sm bg-mar px-5 py-4 text-base font-semibold text-white hover:bg-mar-700"
          >
            Ver meu resultado
          </button>
        </section>
      )}

      {passo === 4 && clt === "sim" && (
        <section className="space-y-3">
          <h2 className="text-2xl">
            A empresa é optante do Simples Nacional?
          </h2>
          <p className="text-sm text-casco/60">
            Isso ajuda a saber se a sua empresa pode usar as versões
            simplificadas previstas na norma.
          </p>
          <Opcao titulo="Sim" onClick={() => concluir("sim")} />
          <Opcao titulo="Não" onClick={() => concluir("nao")} />
          <Opcao titulo="Não sei" detalhe="Seu contador sabe em 1 minuto — seguimos pelo caminho conservador" onClick={() => concluir("nao")} />
        </section>
      )}

      {passo > 1 && (
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-6 text-sm font-medium text-casco/60 underline-offset-4 hover:text-mar-700 hover:underline"
        >
          Voltar à pergunta anterior
        </button>
      )}
    </div>
  );
}
