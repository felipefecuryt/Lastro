import { describe, expect, it } from "vitest";
import { diagnosticar, LIMIAR_CIPA } from "./diagnostico";

describe("diagnosticar — escopo", () => {
  it("sem CLT: fora do escopo, mas avisa sobre MEI contratado", () => {
    const r = diagnosticar({ temClt: false });
    expect(r.aplicavel).toBe(false);
    expect(r.psicossocialObrigatorio).toBe(false);
    expect(r.pgr).toBeNull();
    expect(r.ressalvas.join(" ")).toMatch(/MEI/);
  });

  it("com CLT: psicossocial sempre exigível, qualquer porte", () => {
    const r = diagnosticar({ temClt: true, faixa: "1-9", grauRisco: 1, simples: true });
    expect(r.aplicavel).toBe(true);
    expect(r.psicossocialObrigatorio).toBe(true);
  });
});

describe("diagnosticar — PGR", () => {
  it("ME/EPP grau 1-2 com até 25 empregados: simplificado possível + dispensa condicionada", () => {
    const r = diagnosticar({ temClt: true, faixa: "10-19", grauRisco: 2, simples: true });
    expect(r.pgr).toBe("simplificado-possivel");
    const texto = r.ressalvas.join(" ");
    expect(texto).toMatch(/simplificada/);
    expect(texto).toMatch(/psicossociais continua exigível/);
  });

  it("grau 3: PGR completo mesmo pequena e no Simples", () => {
    const r = diagnosticar({ temClt: true, faixa: "1-9", grauRisco: 3, simples: true });
    expect(r.pgr).toBe("completo");
  });

  it("fora do Simples: PGR completo mesmo em grau baixo", () => {
    const r = diagnosticar({ temClt: true, faixa: "10-19", grauRisco: 1, simples: false });
    expect(r.pgr).toBe("completo");
  });

  it("grau estimado gera ressalva pedindo conferência na NR-4", () => {
    const r = diagnosticar({
      temClt: true,
      faixa: "10-19",
      grauRisco: 2,
      simples: true,
      grauEstimado: true,
    });
    expect(r.ressalvas.join(" ")).toMatch(/NR-4/);
  });
});

describe("diagnosticar — CIPA e Lei 14.457", () => {
  it("limiar por grau segue a configuração", () => {
    expect(LIMIAR_CIPA[1]).toBe(81);
    expect(LIMIAR_CIPA[2]).toBe(51);
    expect(LIMIAR_CIPA[3]).toBe(20);
    expect(LIMIAR_CIPA[4]).toBe(20);
  });

  it("grau 3 com 20-50 empregados: CIPA obrigatória e Lei 14.457 junto", () => {
    const r = diagnosticar({ temClt: true, faixa: "20-50", grauRisco: 3, simples: true });
    expect(r.cipa.obrigatoria).toBe(true);
    expect(r.lei14457).toBe(true);
  });

  it("grau 2 com 20-50 empregados: CIPA ainda não", () => {
    const r = diagnosticar({ temClt: true, faixa: "20-50", grauRisco: 2, simples: true });
    expect(r.cipa.obrigatoria).toBe(false);
    expect(r.lei14457).toBe(false);
  });

  it("grau 2 com 51-80: CIPA sim", () => {
    const r = diagnosticar({ temClt: true, faixa: "51-80", grauRisco: 2, simples: false });
    expect(r.cipa.obrigatoria).toBe(true);
  });

  it("faixa que cruza o limiar sem o piso atingir: avisa para conferir", () => {
    // grau 1, faixa 51-80: limiar é 81, teto 80 → não cruza; faixa 81-300 piso=81 → certa
    const certa = diagnosticar({ temClt: true, faixa: "81-300", grauRisco: 1, simples: false });
    expect(certa.cipa.obrigatoria).toBe(true);
  });
});

describe("diagnosticar — multa e STF", () => {
  it("expõe faixa de multa por trabalhador e o estado da suspensão", () => {
    const r = diagnosticar({ temClt: true, faixa: "10-19", grauRisco: 2, simples: true });
    expect(r.multa.minPorTrabalhador).toBeCloseTo(1610.12);
    expect(r.multa.maxPorTrabalhador).toBeCloseTo(6708.08);
    expect(typeof r.multa.suspensaoStf).toBe("boolean");
  });

  it("todo fundamento tem fonte e URL", () => {
    const r = diagnosticar({ temClt: true, faixa: "20-50", grauRisco: 4, simples: false });
    for (const f of r.fundamentos) {
      expect(f.fonte.length).toBeGreaterThan(3);
      expect(f.url).toMatch(/^https:\/\//);
    }
  });
});
