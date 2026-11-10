import Link from "next/link";
import { DiscoDeCarga } from "./marca-de-carga";

export function SiteFooter() {
  return (
    <footer className="bg-casco text-tinta">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 text-[0.95rem] sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2">
            <DiscoDeCarga className="h-6 w-auto text-mar-200" />
            <span className="font-display text-2xl">Lastro</span>
          </p>
          <p className="mt-3 max-w-xs text-tinta/75">
            Gestão de risco psicossocial (NR-1) para micro e pequenas empresas.
            Mede, acompanha e prova.
          </p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="space-y-2 text-tinta/85">
            <li><Link className="hover:text-white hover:underline" href="/diagnostico">Diagnóstico gratuito</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/guias">Guias</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/metodologia">Metodologia</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/precos">Preços</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/sobre">Sobre</Link></li>
          </ul>
        </nav>
        <div>
          <ul className="space-y-2 text-tinta/85">
            <li><Link className="hover:text-white hover:underline" href="/privacidade">Privacidade e LGPD</Link></li>
            <li><Link className="hover:text-white hover:underline" href="/termos">Termos de uso</Link></li>
          </ul>
          <p className="mt-5 text-sm text-tinta/60">
            O Lastro informa e documenta. Não substitui a orientação do seu
            contador, do profissional de SST nem de advogado.
          </p>
        </div>
      </div>
    </footer>
  );
}
