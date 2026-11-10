"use client";

import { useEffect, useRef } from "react";

/**
 * Liga o progresso de rolagem de uma seção alta (com palco `sticky` dentro)
 * à variável CSS `--p` (0 → 1) no próprio elemento.
 *
 * Não usa estado do React: escreve direto no estilo, uma vez por frame,
 * então a cena inteira anima em CSS sem re-renderizar nada.
 * Com `prefers-reduced-motion`, não faz nada — o CSS fixa um quadro parado.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const medir = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const curso = r.height - window.innerHeight;
      const p = curso > 0 ? Math.min(1, Math.max(0, -r.top / curso)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
    };
    const agendar = () => {
      if (!frame) frame = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}
