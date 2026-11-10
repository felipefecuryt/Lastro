"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { MarcaDeCarga } from "./marca-de-carga";
import { useScrollProgress } from "./use-scroll-progress";

/**
 * Cena de abertura: a carga sobe.
 *
 * Seção alta com um palco preso na tela. A rolagem escreve `--p` e o CSS
 * (globals.css, bloco "Cena 1") faz o resto: os fardos embarcam um a um,
 * o casco afunda, o título comprime e a marca de carga some sob a água.
 */

const FARDOS = [
  { texto: "Metas impossíveis", largura: "54%", a: 0.12, cor: "var(--color-tinta)" },
  { texto: "Jornada sem fim", largura: "40%", a: 0.22, cor: "var(--color-mar-200)" },
  { texto: "Chefia hostil", largura: "44%", a: 0.32, cor: "var(--color-espuma)" },
  { texto: "Zero autonomia", largura: "46%", a: 0.42, cor: "var(--color-tinta)" },
  { texto: "Assédio", largura: "58%", a: 0.52, cor: "var(--color-nevoa)" },
];

const BATIDAS = [
  {
    de: -1,
    ate: 0.16,
    texto:
      "Nos navios, ela é pintada no casco por lei desde 1876: passou dali, a carga põe a tripulação em risco. No trabalho, ninguém pintou essa linha.",
  },
  {
    de: 0.16,
    ate: 0.59,
    texto:
      "A sobrecarga embarca aos poucos. Uma meta a mais, uma hora a mais, uma humilhação de cada vez. De fora, o navio ainda parece bem.",
  },
  {
    de: 0.59,
    ate: 0.81,
    texto:
      "Em 2025, o INSS concedeu 546.254 benefícios por transtornos mentais. É o maior número já registrado no Brasil.",
  },
  {
    de: 0.81,
    ate: 2,
    texto:
      "Desde 26 de maio de 2026, a NR-1 obriga toda empresa com funcionário CLT a saber onde está a linha. Descubra em dois minutos o que ela exige da sua.",
  },
];

export function CenaCarga() {
  const ref = useScrollProgress<HTMLElement>();

  return (
    <section ref={ref} className="cena" aria-label="Todo trabalho tem uma linha de carga">
      <div className="cena-palco">
        <div className="cena-texto">
          <h1 className="cena-titulo">
            Todo trabalho
            <br />
            tem uma linha
            <br />
            de carga.
          </h1>

          <div className="cena-batidas">
            {BATIDAS.map((b) => (
              <p
                key={b.de}
                className="cena-batida"
                style={{ "--de": b.de, "--ate": b.ate } as CSSProperties}
              >
                {b.texto}
              </p>
            ))}
          </div>

          <div className="cena-cta mt-[2.5svh] flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/diagnostico"
              className="rounded-sm bg-mar px-6 py-3 text-base font-semibold text-white hover:bg-mar-700"
            >
              Fazer o diagnóstico gratuito
            </Link>
            <p className="cena-dica text-sm text-casco/60">
              ou role a página para carregar o navio
            </p>
          </div>
        </div>

        <div className="cena-figura" aria-hidden>
          <div className="cena-casco">
            <div className="cena-carga">
              {FARDOS.map((f) => (
                <div
                  key={f.texto}
                  className="cena-fardo"
                  style={{ "--a": f.a, "--cor": f.cor, width: f.largura } as CSSProperties}
                >
                  {f.texto}
                </div>
              ))}
            </div>

            <div className="cena-chapa">
              <div className="cena-costura" style={{ top: "9svh" }} />
              <div className="cena-zarcao" />
            </div>

            <div className="cena-calado">
              <span>22</span>
              <span>20</span>
              <span>18</span>
              <span>16</span>
              <span>14</span>
            </div>

            <MarcaDeCarga className="cena-marca" animada cor="var(--color-tinta)" />
          </div>

          <div className="cena-agua agua" />
        </div>
      </div>
    </section>
  );
}
