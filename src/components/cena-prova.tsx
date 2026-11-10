"use client";

import type { CSSProperties } from "react";
import { MarcaDeCarga } from "./marca-de-carga";
import { useScrollProgress } from "./use-scroll-progress";

/**
 * Cena 2: a carga baixa.
 *
 * Espelho da abertura. Lá a água sobe até cobrir a marca; aqui, enquanto os
 * três passos do ciclo passam, ela desce até a marca reaparecer —
 * "prova de que o risco caiu", desenhada.
 */

const PASSOS = [
  {
    de: -1,
    ate: 0.34,
    titulo: "1. Medir",
    texto:
      "Pesquisa anônima com a equipe, pelo WhatsApp, em três minutos. Resultado de grupo com menos de cinco pessoas nunca aparece.",
  },
  {
    de: 0.34,
    ate: 0.67,
    titulo: "2. Agir",
    texto:
      "Cada risco vira uma ação com dono e prazo. Um responsável técnico revisa e assina o inventário e o plano.",
  },
  {
    de: 0.67,
    ate: 2,
    titulo: "3. Provar",
    texto:
      "No ciclo seguinte, a mesma medida mostra se a carga baixou. É essa prova que a fiscalização e a Justiça do Trabalho pedem.",
  },
];

export function CenaProva() {
  const ref = useScrollProgress<HTMLElement>();

  return (
    <section ref={ref} className="prova" aria-label="Como o Lastro funciona">
      <div className="prova-palco">
        <div className="prova-texto">
          <h2 className="text-[min(4.2vw,8svh)] text-tinta max-md:text-[min(9vw,5svh)]">
            Lastro é o peso que mantém o navio em pé.
          </h2>
          <div className="prova-passos">
            {PASSOS.map((p) => (
              <div
                key={p.titulo}
                className="cena-batida"
                style={{ "--de": p.de, "--ate": p.ate } as CSSProperties}
              >
                <h3 className="text-2xl text-mar-200 md:text-3xl">{p.titulo}</h3>
                <p className="mt-2 max-w-md text-tinta/90">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="prova-leitura" aria-hidden>
          <p className="cena-batida" style={{ "--de": -1, "--ate": 0.55 } as CSSProperties}>
            1º ciclo: carga acima da linha
          </p>
          <p
            className="cena-batida font-semibold"
            style={{ "--de": 0.6, "--ate": 2 } as CSSProperties}
          >
            2º ciclo: a linha voltou a aparecer
          </p>
        </div>

        <div aria-hidden>
          <div className="prova-zarcao" />
          <MarcaDeCarga className="prova-marca" cor="var(--color-tinta)" />
          <div className="prova-agua agua" />
        </div>
      </div>
    </section>
  );
}
