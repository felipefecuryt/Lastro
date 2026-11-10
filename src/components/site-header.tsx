import Link from "next/link";
import { DiscoDeCarga } from "./marca-de-carga";

const NAV = [
  { href: "/diagnostico", rotulo: "Diagnóstico" },
  { href: "/guias", rotulo: "Guias" },
  { href: "/metodologia", rotulo: "Metodologia" },
  { href: "/precos", rotulo: "Preços" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-nevoa/70 bg-tinta/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-casco">
          <DiscoDeCarga className="h-6 w-auto text-mar" />
          <span className="font-display text-2xl">Lastro</span>
        </Link>
        <nav
          aria-label="Principal"
          className="hidden items-center gap-7 text-[0.95rem] font-medium text-casco/75 md:flex"
        >
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-casco">
              {item.rotulo}
            </Link>
          ))}
        </nav>
        <Link
          href="/diagnostico"
          className="rounded-sm bg-mar px-4 py-2 text-sm font-semibold text-white hover:bg-mar-700"
        >
          Fazer diagnóstico
        </Link>
      </div>
    </header>
  );
}
