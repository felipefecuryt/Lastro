import type { Metadata } from "next";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso do site do Lastro.",
};

export default function TermosPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Termos de uso</h1>
      <p className="mt-2 text-sm text-casco/60">Versão de 10/11/2026 — site institucional (fase atual)</p>
      <LinhaDeCarga className="mt-8" />

      <div className="mt-6 space-y-6 leading-relaxed text-casco/85">
        <section>
          <h2 className="text-2xl">1. O que este site é</h2>
          <p className="mt-2">
            O Lastro oferece, nesta fase, conteúdo informativo e um diagnóstico
            gratuito de obrigação sobre a NR-1 e riscos psicossociais. O uso é
            livre e gratuito.
          </p>
        </section>
        <section>
          <h2 className="text-2xl">2. O que este site não é</h2>
          <p className="mt-2">
            O diagnóstico e os guias são informativos e usam aproximações
            declaradas (como o grau de risco estimado por setor). Eles não
            constituem consultoria jurídica, contábil ou de segurança do
            trabalho, e não substituem a análise do seu caso por profissional
            habilitado. Decisões tomadas com base no conteúdo são de
            responsabilidade de quem as toma.
          </p>
        </section>
        <section>
          <h2 className="text-2xl">3. Fontes e atualização</h2>
          <p className="mt-2">
            Citamos a norma e linkamos a fonte oficial em cada conclusão. A
            legislação muda — inclusive por decisões em andamento no STF — e nos
            esforçamos para atualizar o conteúdo rapidamente, sem garantia de
            que tudo reflita a norma vigente a cada minuto. Encontrou algo
            desatualizado? Avise pelo contato do rodapé.
          </p>
        </section>
        <section>
          <h2 className="text-2xl">4. Propriedade e uso do conteúdo</h2>
          <p className="mt-2">
            Você pode compartilhar links e citar trechos dos guias com crédito.
            Reprodução integral para fins comerciais depende de autorização.
          </p>
        </section>
        <section>
          <h2 className="text-2xl">5. Mudanças nestes termos</h2>
          <p className="mt-2">
            Estes termos valem para o site institucional. Quando a plataforma
            abrir, haverá contrato e termos próprios, com cláusulas de
            tratamento de dados — e esta página indicará a versão nova.
          </p>
        </section>
      </div>
    </div>
  );
}
