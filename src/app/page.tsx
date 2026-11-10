import Link from "next/link";
import { CenaCarga } from "@/components/cena-carga";
import { CenaProva } from "@/components/cena-prova";
import { GUIAS } from "@/lib/guias";

const PERGUNTAS = [
  "Sua empresa tem funcionário com carteira assinada?",
  "Quantos?",
  "Qual é a atividade principal?",
  "É optante do Simples Nacional?",
];

export default function Home() {
  return (
    <>
      <CenaCarga />
      <CenaProva />

      {/* O diagnóstico, mostrado como ele é: quatro perguntas */}
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 md:grid-cols-2 md:gap-16 md:py-28">
        <div>
          <h2 className="text-4xl sm:text-5xl">
            Quatro perguntas. Dois minutos. Nenhum cadastro.
          </h2>
          <p className="mt-5 max-w-md text-casco/75">
            O diagnóstico diz o que a NR-1 exige da sua empresa em riscos
            psicossociais: PGR, CIPA, canal de denúncia e multa. Cada conclusão
            vem com o item da norma e o link da fonte oficial.
          </p>
          <Link
            href="/diagnostico"
            className="mt-8 inline-block rounded-sm bg-mar px-6 py-3 text-base font-semibold text-white hover:bg-mar-700"
          >
            Fazer o diagnóstico gratuito
          </Link>
        </div>

        <ol className="border-t-2 border-casco">
          {PERGUNTAS.map((pergunta, i) => (
            <li
              key={pergunta}
              className="flex items-baseline gap-5 border-b border-nevoa py-5"
            >
              <span className="font-display tnum w-8 shrink-0 text-3xl text-mar">
                {i + 1}
              </span>
              <span className="text-lg">{pergunta}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Guias */}
      <section className="border-t border-nevoa bg-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
          <h2 className="text-4xl sm:text-5xl">Leia antes de decidir.</h2>
          <p className="mt-4 max-w-xl text-casco/75">
            As dúvidas que todo dono de empresa tem sobre a NR-1, respondidas
            sem juridiquês e com a norma citada.
          </p>
          <ul className="mt-10 border-t-2 border-casco">
            {GUIAS.map((g) => (
              <li key={g.slug} className="border-b border-nevoa">
                <Link
                  href={`/guias/${g.slug}`}
                  className="group grid gap-2 py-6 md:grid-cols-[1.1fr_1fr] md:gap-10"
                >
                  <h3 className="text-2xl group-hover:text-mar-700 md:text-3xl">
                    {g.titulo}
                  </h3>
                  <p className="text-casco/70">{g.resumo}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
