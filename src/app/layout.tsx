import type { Metadata } from "next";
// Archivo variável (eixos de peso e largura), servida pelo próprio site:
// nenhuma requisição a terceiros para carregar fonte.
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://lastro.app.br"),
  title: {
    default: "Lastro — risco psicossocial (NR-1) para pequenas empresas",
    template: "%s · Lastro",
  },
  description:
    "Todo trabalho tem uma linha de carga. Descubra em 2 minutos, de graça, o que a NR-1 exige da sua empresa em riscos psicossociais.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
