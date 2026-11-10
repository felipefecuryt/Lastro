import type { Metadata } from "next";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Metodologia",
  description:
    "Como o diagnóstico do Lastro funciona por dentro: de onde vem cada regra, o que é estimativa declarada e como o anonimato será garantido na plataforma.",
};

export default function MetodologiaPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Metodologia</h1>
      <p className="mt-3 text-casco/75">
        Nenhum concorrente publica como calcula. A gente publica — porque é
        exatamente isso que um auditor fiscal, um advogado ou um bom contador
        perguntam.
      </p>
      <LinhaDeCarga className="mt-8" />

      <div className="mt-8 space-y-6 leading-relaxed text-casco/85">
        <section>
          <h2 className="text-2xl">O diagnóstico gratuito</h2>
          <p className="mt-2">
            Cada conclusão do diagnóstico vem de um dispositivo normativo
            identificado — NR-1 (com a redação da Portaria MTE nº 1.419/2024),
            NR-4, NR-5, NR-28 e Lei nº 14.457/2022 — e o resultado exibe a fonte
            com link ao lado de cada afirmação. As regras vivem em um módulo de
            configuração versionado e testado automaticamente, separado das
            telas: quando a norma muda, a regra muda em um lugar só.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">O que é estimativa — e é dito</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Grau de risco por setor.</strong> O valor oficial é
              definido por CNAE no Quadro I da NR-4. Quando você escolhe um
              setor em vez de informar o grau, usamos uma aproximação típica do
              setor e o resultado avisa que o número é estimado.
            </li>
            <li>
              <strong>ME/EPP via Simples.</strong> O enquadramento oficial é por
              receita; usamos a opção pelo Simples como aproximação razoável e
              dizemos isso no resultado.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl">A plataforma (em construção)</h2>
          <p className="mt-2">
            A pesquisa com os colaboradores usará instrumento curto baseado em
            referências consolidadas de fatores psicossociais — demanda,
            controle, apoio, relacionamentos, clareza de função e mudança —
            mapeadas nos fatores que a NR-1 exige avaliar. Três compromissos já
            estão definidos:
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Anonimato por matemática.</strong> Nenhum resultado é
              exibido para grupos com menos de 5 respondentes, e a resposta é
              gravada sem vínculo com quem respondeu — não existe consulta capaz
              de reconstruir o vínculo, porque ele não é armazenado.
            </li>
            <li>
              <strong>Adesão declarada.</strong> Relatório com menos de 50% de
              resposta sai com ressalva de representatividade escrita. Nunca
              escondemos o <span className="tnum">n</span>.
            </li>
            <li>
              <strong>Revisão humana.</strong> Nada com efeito legal é emitido
              sem revisão e assinatura de profissional habilitado.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl">Limites</h2>
          <p className="mt-2">
            O Lastro mede condições de trabalho, não pessoas. Não fazemos
            diagnóstico clínico, não geramos escore individual e não
            substituímos contador, profissional de SST nem advogado. Achou um
            erro em alguma regra? Escreva para a gente — corrigir rápido faz
            parte da metodologia.
          </p>
        </section>
      </div>
    </div>
  );
}
