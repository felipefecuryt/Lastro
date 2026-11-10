import type {
  EntradaDiagnostico,
  Fundamento,
  GrauRisco,
  ResultadoDiagnostico,
} from "./tipos";

/**
 * Motor do diagnóstico de obrigação — NR-1, riscos psicossociais.
 *
 * Função pura, sem efeito colateral, coberta por testes.
 * Fontes de cada regra ficam em FUNDAMENTOS, com link.
 *
 * Última revisão normativa: 10/11/2026.
 */

/** Limiar de empregados para CIPA por grau de risco (NR-5, Quadro I, simplificado). */
export const LIMIAR_CIPA: Record<GrauRisco, number> = {
  1: 81,
  2: 51,
  3: 20,
  4: 20,
};

/** Multa por ausência de avaliação de riscos psicossociais (NR-28, infração grave), por trabalhador exposto. */
export const MULTA = { min: 1610.12, max: 6708.08 };

/** As multas estão com eficácia suspensa pelo STF (ADPF 1316)? Atualizar quando a conciliação terminar. */
export const SUSPENSAO_STF_ATIVA = true;

/** Teto da faixa, usado para comparar com limiares. */
const TETO_FAIXA: Record<string, number> = {
  "1-9": 9,
  "10-19": 19,
  "20-50": 50,
  "51-80": 80,
  "81-300": 300,
  "300+": Infinity,
};

/** Piso da faixa. */
const PISO_FAIXA: Record<string, number> = {
  "1-9": 1,
  "10-19": 10,
  "20-50": 20,
  "51-80": 51,
  "81-300": 81,
  "300+": 301,
};

const F = {
  vigencia: {
    texto:
      "Desde 26/05/2026, toda organização com empregado CLT deve identificar, avaliar e gerenciar fatores de risco psicossociais no âmbito do GRO/PGR.",
    fonte: "NR-1, cap. 1.5, com a redação da Portaria MTE nº 1.419/2024",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-1-nr-1",
  },
  stf: {
    texto:
      "O STF suspendeu temporariamente multas e sanções ligadas aos itens de risco psicossocial (ADPF 1316) enquanto corre conciliação. A obrigação continua em vigor e o tema segue utilizável em ações trabalhistas.",
    fonte: "STF, ADPF 1316 (liminar de 25/06/2026, prorrogada em 24/09/2026)",
    url: "https://noticias.stf.jus.br/postsnoticias/stf-suspende-sancoes-da-nr-1-e-abre-conciliacao-sobre-regras-de-riscos-psicossociais-no-trabalho/",
  },
  mei: {
    texto:
      "O MEI é dispensado de elaborar PGR. A dispensa não alcança quem o contrata: a empresa contratante deve incluí-lo nas ações de prevenção e no seu PGR quando ele atuar nas dependências dela.",
    fonte: "NR-1, itens 1.8.1 e 1.8.1.1",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-1-nr-1",
  },
  dispensa: {
    texto:
      "ME e EPP de graus de risco 1 e 2 podem ser dispensadas de elaborar o PGR se o levantamento preliminar não identificar exposição a agentes físicos, químicos e biológicos. A dispensa NÃO afasta a gestão dos riscos ergonômicos e psicossociais.",
    fonte: "NR-1, item 1.8.4, e orientações do MTE",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-1-nr-1",
  },
  cipa: {
    texto:
      "A obrigação de constituir CIPA depende do número de empregados e do grau de risco (Quadro I da NR-5).",
    fonte: "NR-5, Quadro I",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-5-nr-5",
  },
  lei14457: {
    texto:
      "Empresas obrigadas a manter CIPA devem ter regras de conduta sobre assédio, canal de denúncia com anonimato, procedimento de apuração e capacitação de todos os níveis a cada 12 meses.",
    fonte: "Lei nº 14.457/2022, art. 23",
    url: "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2022/lei/l14457.htm",
  },
  multa: {
    texto:
      "A ausência de avaliação de riscos psicossociais é infração grave, com multa por trabalhador exposto.",
    fonte: "NR-28 (valores de referência)",
    url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-28-nr-28",
  },
} satisfies Record<string, Fundamento>;

export function diagnosticar(e: EntradaDiagnostico): ResultadoDiagnostico {
  // Sem CLT: fora do escopo como empregadora. O aviso do MEI contratado importa.
  if (!e.temClt) {
    return {
      aplicavel: false,
      psicossocialObrigatorio: false,
      pgr: null,
      ressalvas: [
        "Sem empregado CLT, a NR-1 não se aplica à sua empresa como empregadora.",
        "Se você presta serviço como MEI dentro de outra empresa, ela deve incluir você nas ações de prevenção e no PGR dela.",
        "Se você contrata MEI que atua nas suas dependências e vier a ter empregado CLT, esse MEI entra no seu PGR.",
      ],
      cipa: { obrigatoria: false, limiar: null },
      lei14457: false,
      multa: {
        minPorTrabalhador: MULTA.min,
        maxPorTrabalhador: MULTA.max,
        suspensaoStf: SUSPENSAO_STF_ATIVA,
      },
      fundamentos: [F.mei, F.vigencia],
    };
  }

  const faixa = e.faixa ?? "1-9";
  const grau = e.grauRisco ?? 2;
  const teto = TETO_FAIXA[faixa];
  const piso = PISO_FAIXA[faixa];

  const ressalvas: string[] = [];
  const fundamentos: Fundamento[] = [F.vigencia];

  // PGR: dispensa possível / simplificado / completo
  let pgr: ResultadoDiagnostico["pgr"] = "completo";
  const grauBaixo = grau === 1 || grau === 2;
  const provavelMeEpp = e.simples === true;

  if (grauBaixo && provavelMeEpp) {
    if (teto <= 25) {
      pgr = "simplificado-possivel";
      ressalvas.push(
        "Com até 25 empregados e grau de risco 1 ou 2, cabe PGR em versão simplificada, que pode ser elaborada pelo próprio empregador capacitado.",
      );
    }
    pgr = teto <= 25 ? "simplificado-possivel" : pgr;
    // Dispensa possível, condicionada ao levantamento preliminar
    if (pgr !== "completo") {
      ressalvas.push(
        "Se o levantamento preliminar não identificar exposição a agentes físicos, químicos e biológicos, a empresa pode ser dispensada de elaborar o PGR — mas a gestão dos riscos ergonômicos e psicossociais continua exigível (registro via avaliação ergonômica preliminar).",
      );
      fundamentos.push(F.dispensa);
    }
  }

  if (e.grauEstimado) {
    ressalvas.push(
      "O grau de risco usado aqui é estimado a partir do setor. O valor oficial é definido pelo CNAE no Quadro I da NR-4 — confirme com seu contador antes de decidir qualquer coisa.",
    );
  }

  // CIPA e Lei 14.457
  const limiar = LIMIAR_CIPA[grau];
  const cipaObrigatoria = piso >= limiar || teto >= limiar;
  const cipaCerta = piso >= limiar;
  if (cipaObrigatoria && !cipaCerta) {
    ressalvas.push(
      `Na sua faixa, a CIPA passa a ser exigida a partir de ${limiar} empregados (grau de risco ${grau}). Confira o número exato.`,
    );
  }
  fundamentos.push(F.cipa);
  if (cipaCerta) {
    fundamentos.push(F.lei14457);
  }
  fundamentos.push(F.multa, F.stf);

  return {
    aplicavel: true,
    psicossocialObrigatorio: true,
    pgr,
    ressalvas,
    cipa: { obrigatoria: cipaCerta, limiar },
    lei14457: cipaCerta,
    multa: {
      minPorTrabalhador: MULTA.min,
      maxPorTrabalhador: MULTA.max,
      suspensaoStf: SUSPENSAO_STF_ATIVA,
    },
    fundamentos,
  };
}
