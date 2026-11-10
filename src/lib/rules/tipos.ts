/**
 * Tipos do motor de regras do diagnóstico de obrigação (NR-1 psicossocial).
 *
 * Regra do projeto: TODA regra normativa vive em configuração neste módulo,
 * nunca espalhada em `if` pelas telas. A conciliação da ADPF 1316 no STF pode
 * mudar parâmetros da NR-1; quando mudar, a atualização acontece aqui.
 */

export type GrauRisco = 1 | 2 | 3 | 4;

export type FaixaEmpregados =
  | "1-9"
  | "10-19"
  | "20-50"
  | "51-80"
  | "81-300"
  | "300+";

export interface EntradaDiagnostico {
  /** A empresa tem ao menos um empregado CLT? */
  temClt: boolean;
  /** Faixa de número de empregados CLT. */
  faixa?: FaixaEmpregados;
  /** Grau de risco (NR-4, Quadro I). Vem do setor escolhido ou informado direto. */
  grauRisco?: GrauRisco;
  /** O grau foi estimado a partir do setor (true) ou informado pelo usuário (false)? */
  grauEstimado?: boolean;
  /** Optante do Simples Nacional — usado como aproximação de ME/EPP. */
  simples?: boolean;
}

export type StatusPgr =
  | "completo"
  | "simplificado-possivel"
  | "dispensa-possivel";

export interface Fundamento {
  /** Afirmação em linguagem simples. */
  texto: string;
  /** Dispositivo ou fonte. */
  fonte: string;
  /** Link oficial ou de referência. */
  url: string;
}

export interface ResultadoDiagnostico {
  /** A empresa está no escopo da NR-1 como empregadora? */
  aplicavel: boolean;
  /** Gestão de riscos psicossociais é exigível (sempre que há CLT). */
  psicossocialObrigatorio: boolean;
  /** Situação provável quanto ao PGR. */
  pgr: StatusPgr | null;
  /** Observações que qualificam o resultado (dispensa não alcança X etc.). */
  ressalvas: string[];
  cipa: {
    obrigatoria: boolean;
    /** Nº de empregados a partir do qual a CIPA é exigida para o grau informado. */
    limiar: number | null;
  };
  /** Obrigações da Lei 14.457/2022 (canal de denúncia etc.) — seguem a CIPA. */
  lei14457: boolean;
  multa: {
    /** Por trabalhador exposto, em reais (NR-28, infração grave). */
    minPorTrabalhador: number;
    maxPorTrabalhador: number;
    /** Multas suspensas temporariamente pelo STF (ADPF 1316); obrigação mantida. */
    suspensaoStf: boolean;
  };
  fundamentos: Fundamento[];
}
