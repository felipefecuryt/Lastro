/** Conteúdo dos guias — fase 0. Texto revisado em 10/11/2026. */

export interface Fonte {
  rotulo: string;
  url: string;
}

export type BlocoGuia =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "aviso"; texto: string };

export interface Guia {
  slug: string;
  titulo: string;
  resumo: string;
  atualizadoEm: string;
  blocos: BlocoGuia[];
  fontes: Fonte[];
}

export const GUIAS: Guia[] = [
  {
    slug: "minha-empresa-precisa-avaliar-risco-psicossocial",
    titulo: "Minha empresa precisa fazer avaliação de risco psicossocial?",
    resumo:
      "Resposta curta: se tem um empregado CLT, sim. O que mudou na NR-1, desde quando vale e o que acontece com quem não fizer.",
    atualizadoEm: "2026-11-10",
    blocos: [
      {
        tipo: "p",
        texto:
          "Se a sua empresa tem pelo menos um empregado com carteira assinada, a resposta é sim. A Portaria MTE nº 1.419/2024 incluiu os fatores de risco psicossociais — sobrecarga, metas abusivas, assédio, falta de autonomia, relação com lideranças — no gerenciamento de riscos ocupacionais da NR-1, e a exigência vale desde 26 de maio de 2026 para empresas de qualquer porte.",
      },
      { tipo: "h2", texto: "O que exatamente é exigido" },
      {
        tipo: "lista",
        itens: [
          "Identificar e avaliar os fatores de risco psicossociais relacionados ao trabalho, junto com os demais riscos.",
          "Registrar esses riscos no inventário e definir medidas no plano de ação (as duas peças do PGR).",
          "Consultar os trabalhadores sobre a percepção de riscos e comunicar o resultado consolidado.",
          "Acompanhar se as medidas funcionaram — a norma pede análise de eficácia, não papel.",
        ],
      },
      { tipo: "h2", texto: "O que NÃO é exigido" },
      {
        tipo: "p",
        texto:
          "A norma não pede diagnóstico clínico de ninguém. A abordagem é organizacional e coletiva: mede-se a condição de trabalho, não a saúde mental de cada pessoa. Nenhum trabalhador deve receber 'nota' individual, e avaliação psicossocial não é avaliação psicológica.",
      },
      { tipo: "h2", texto: "E se eu não fizer?" },
      {
        tipo: "p",
        texto:
          "A ausência de avaliação é infração grave, com multa de R$ 1.610,12 a R$ 6.708,08 por trabalhador exposto. Em 2026 o STF suspendeu temporariamente a aplicação dessas multas (ADPF 1316) enquanto negocia critérios objetivos de fiscalização — mas a obrigação continua valendo, e a omissão segue sendo usada como prova em ações trabalhistas e em pedidos de reconhecimento de doença ocupacional.",
      },
      {
        tipo: "aviso",
        texto:
          "Não sabe por onde começar? O diagnóstico gratuito do Lastro diz, em 2 minutos, o que se aplica exatamente ao seu caso — com a norma citada item a item.",
      },
    ],
    fontes: [
      {
        rotulo: "NR-1 (texto vigente) — Ministério do Trabalho e Emprego",
        url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-1-nr-1",
      },
      {
        rotulo: "STF — suspensão de sanções e conciliação (ADPF 1316)",
        url: "https://noticias.stf.jus.br/postsnoticias/stf-suspende-sancoes-da-nr-1-e-abre-conciliacao-sobre-regras-de-riscos-psicossociais-no-trabalho/",
      },
    ],
  },
  {
    slug: "stf-suspendeu-a-nr-1-o-que-vale",
    titulo: "O STF suspendeu a NR-1? O que ficou suspenso — e o que continua valendo",
    resumo:
      "A notícia correu como 'a fiscalização parou'. É meia-verdade perigosa: o STF suspendeu a multa, não a obrigação.",
    atualizadoEm: "2026-11-10",
    blocos: [
      {
        tipo: "p",
        texto:
          "Em 25 de junho de 2026, na ADPF 1316, o ministro André Mendonça suspendeu por 90 dias a eficácia punitiva de itens da NR-1 ligados aos riscos psicossociais, abrindo uma fase de conciliação para dar parâmetros objetivos à fiscalização. Em 24 de setembro de 2026 a suspensão foi prorrogada por mais 90 dias. Muita gente leu 'a NR-1 caiu'. Não caiu.",
      },
      { tipo: "h2", texto: "O que está suspenso" },
      {
        tipo: "lista",
        itens: [
          "Multas e autuações baseadas especificamente nos itens de risco psicossocial alcançados pela decisão.",
          "Sanções já aplicadas com esse fundamento, enquanto durar a conciliação.",
        ],
      },
      { tipo: "h2", texto: "O que continua valendo" },
      {
        tipo: "lista",
        itens: [
          "A NR-1 segue em vigor, incluindo o dever de identificar, avaliar e gerenciar riscos psicossociais no GRO/PGR.",
          "O uso da omissão como prova em ações trabalhistas — a suspensão não alcança a Justiça do Trabalho.",
          "Todas as demais obrigações do PGR e das outras NRs.",
        ],
      },
      { tipo: "h2", texto: "O que fazer com essa janela" },
      {
        tipo: "p",
        texto:
          "A leitura estratégica é simples: o período sem multa é tempo para estruturar e documentar a gestão de riscos com calma — não para adiá-la. Quando a conciliação terminar e os critérios objetivos saírem, a demanda por adequação vai saltar de uma vez, e quem deixou para depois vai se adequar correndo e pagando mais.",
      },
    ],
    fontes: [
      {
        rotulo: "STF — notícia oficial da liminar na ADPF 1316",
        url: "https://noticias.stf.jus.br/postsnoticias/stf-suspende-sancoes-da-nr-1-e-abre-conciliacao-sobre-regras-de-riscos-psicossociais-no-trabalho/",
      },
      {
        rotulo: "Prorrogação da suspensão por mais 90 dias (24/09/2026)",
        url: "https://www.legisweb.com.br/noticia/?id=34443",
      },
    ],
  },
  {
    slug: "simples-dispensa-pgr-e-o-mei",
    titulo: "Empresa do Simples é dispensada de PGR? E o MEI que você contrata?",
    resumo:
      "A dispensa existe, mas é bem menor do que parece — e tem uma pegadinha com MEI contratado que pega muita empresa de surpresa.",
    atualizadoEm: "2026-11-10",
    blocos: [
      {
        tipo: "p",
        texto:
          "Sim, a NR-1 prevê dispensas — mas elas são condicionais e não cobrem o que a maioria imagina. Três situações diferentes costumam ser misturadas: o MEI, a ME/EPP de grau de risco baixo e todo o resto.",
      },
      { tipo: "h2", texto: "MEI: dispensado — com uma pegadinha" },
      {
        tipo: "p",
        texto:
          "O MEI é dispensado de elaborar o PGR (item 1.8.1 da NR-1). Mas o item 1.8.1.1 é literal: a dispensa não alcança a organização contratante. Se a sua empresa contrata um MEI que trabalha nas suas dependências, você deve incluí-lo nas suas ações de prevenção e no seu PGR. O MEI é dispensado do documento dele — não some do seu.",
      },
      { tipo: "h2", texto: "ME e EPP de grau 1 e 2: dispensa condicionada" },
      {
        tipo: "p",
        texto:
          "Microempresas e empresas de pequeno porte de graus de risco 1 e 2 podem ser dispensadas de elaborar o PGR — desde que o levantamento preliminar não identifique exposição a agentes físicos, químicos e biológicos. E aqui está o ponto que quase ninguém comunica: pela orientação do próprio MTE, essa dispensa não afasta a gestão dos riscos ergonômicos e psicossociais, que deve ser mantida com registro (a avaliação ergonômica preliminar).",
      },
      {
        tipo: "aviso",
        texto:
          "Tradução: estar 'dispensada de PGR' não significa estar dispensada do risco psicossocial. Muita empresa que se acha fora da regra está dentro.",
      },
      { tipo: "h2", texto: "Grau 3 e 4, ou fora do Simples: PGR completo" },
      {
        tipo: "p",
        texto:
          "Indústria, construção, transporte, saúde e demais atividades de grau 3 e 4 seguem no PGR completo, independentemente do porte. Para ME/EPP de grau 1 e 2 com até 25 empregados existe ainda a possibilidade do PGR em versão simplificada, elaborado pelo próprio empregador capacitado.",
      },
    ],
    fontes: [
      {
        rotulo: "NR-1, capítulo 1.8 (tratamento diferenciado a MEI, ME e EPP)",
        url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao-do-trabalho/seguranca-e-saude-no-trabalho/ctpp-nrs/norma-regulamentadora-no-1-nr-1",
      },
    ],
  },
];

export function guiaPorSlug(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
