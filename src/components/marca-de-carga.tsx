/**
 * A marca de carga (disco de Plimsoll): o símbolo do Lastro.
 *
 * Nos navios, duas letras ao lado do disco identificam quem certificou a
 * linha. Aqui elas são N e R — de norma regulamentadora.
 */
export function MarcaDeCarga({
  className,
  animada = false,
  cor = "currentColor",
}: {
  className?: string;
  /** Desenha o traço na carga da página (só na cena de abertura). */
  animada?: boolean;
  cor?: string;
}) {
  const traco = animada ? "traco" : undefined;
  const letra = animada ? "letra" : undefined;
  return (
    <svg
      viewBox="0 0 220 100"
      className={className}
      role="img"
      aria-label="Marca de carga"
      fill="none"
    >
      <circle className={traco} cx="110" cy="50" r="40" stroke={cor} strokeWidth="8" />
      <path className={traco} d="M46 50H174" stroke={cor} strokeWidth="8" />
      <text
        className={letra}
        x="20"
        y="63"
        textAnchor="middle"
        fill={cor}
        fontSize="36"
        fontWeight="800"
        style={{ fontStretch: "70%" }}
      >
        N
      </text>
      <text
        className={letra}
        x="200"
        y="63"
        textAnchor="middle"
        fill={cor}
        fontSize="36"
        fontWeight="800"
        style={{ fontStretch: "70%" }}
      >
        R
      </text>
    </svg>
  );
}

/** Versão só com disco e linha, para o logotipo e divisores. */
export function DiscoDeCarga({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden fill="none">
      <circle cx="32" cy="20" r="14" stroke="currentColor" strokeWidth="5" />
      <path d="M6 20H58" stroke="currentColor" strokeWidth="5" />
    </svg>
  );
}

/**
 * Divisor de página: a linha de carga atravessando a largura do conteúdo.
 * Usado uma vez por página, logo abaixo do título.
 */
export function LinhaDeCarga({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden>
      <DiscoDeCarga className="-mr-1 h-6 w-auto shrink-0 text-mar" />
      <div className="h-[3px] flex-1 bg-mar" />
    </div>
  );
}
