import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIAS, guiaPorSlug } from "@/lib/guias";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guia = guiaPorSlug(slug);
  if (!guia) return {};
  return { title: guia.titulo, description: guia.resumo };
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guia = guiaPorSlug(slug);
  if (!guia) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Link href="/guias" className="text-sm font-medium text-mar-700 hover:underline">
        Todos os guias
      </Link>
      <h1 className="mt-4 text-4xl sm:text-5xl">{guia.titulo}</h1>
      <p className="mt-2 text-sm text-casco/60">
        Atualizado em{" "}
        {new Date(`${guia.atualizadoEm}T12:00:00`).toLocaleDateString("pt-BR")}
      </p>
      <LinhaDeCarga className="mt-8" />

      <div className="mt-8 space-y-5 leading-relaxed text-casco/85">
        {guia.blocos.map((b, i) => {
          if (b.tipo === "h2")
            return (
              <h2 key={i} className="pt-2 text-2xl">
                {b.texto}
              </h2>
            );
          if (b.tipo === "lista")
            return (
              <ul key={i} className="list-disc space-y-2 pl-5">
                {b.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          if (b.tipo === "aviso")
            return (
              <p key={i} className="rounded-sm border border-mar-200 bg-espuma p-4 text-casco">
                {b.texto}
              </p>
            );
          return <p key={i}>{b.texto}</p>;
        })}
      </div>

      <section className="mt-10 border-t border-nevoa pt-6">
        <h2 className="text-2xl">Fontes</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {guia.fontes.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-mar-700 underline underline-offset-4 hover:text-casco"
              >
                {f.rotulo}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 rounded-sm bg-casco p-6 text-center">
        <p className="font-display text-xl text-tinta">
          Quer saber o que vale para a SUA empresa?
        </p>
        <Link
          href="/diagnostico"
          className="mt-4 inline-block rounded-sm bg-tinta px-5 py-2.5 font-semibold text-casco hover:bg-white"
        >
          Fazer o diagnóstico gratuito
        </Link>
      </div>
    </article>
  );
}
