import type { GrauRisco } from "./tipos";

/**
 * Setores comuns com grau de risco ESTIMADO.
 *
 * O grau de risco oficial é definido por CNAE no Quadro I da NR-4.
 * Esta lista é uma aproximação para orientar o diagnóstico gratuito;
 * o resultado sempre avisa que o valor é estimado e deve ser conferido
 * na NR-4 ou com o contador. Na fase 1 do produto, este arquivo será
 * substituído pela tabela completa CNAE → grau, importada da fonte oficial.
 */
export interface Setor {
  id: string;
  rotulo: string;
  exemplos: string;
  grauEstimado: GrauRisco;
}

export const SETORES: Setor[] = [
  { id: "escritorio", rotulo: "Escritório e serviços administrativos", exemplos: "contabilidade, advocacia, TI, consultoria, imobiliária", grauEstimado: 1 },
  { id: "comercio", rotulo: "Comércio (loja, mercado)", exemplos: "loja de roupas, mercadinho, papelaria, farmácia", grauEstimado: 2 },
  { id: "alimentacao", rotulo: "Restaurante, bar ou lanchonete", exemplos: "restaurante, pizzaria, cafeteria, delivery", grauEstimado: 2 },
  { id: "beleza", rotulo: "Beleza e estética", exemplos: "salão, barbearia, clínica de estética", grauEstimado: 2 },
  { id: "educacao", rotulo: "Educação", exemplos: "escola, curso livre, reforço, idiomas", grauEstimado: 2 },
  { id: "academia", rotulo: "Academia e esporte", exemplos: "academia, estúdio, escolinha esportiva", grauEstimado: 2 },
  { id: "saude", rotulo: "Saúde", exemplos: "clínica, consultório, laboratório, odontologia", grauEstimado: 3 },
  { id: "industria", rotulo: "Indústria e fabricação", exemplos: "confecção, alimentos, móveis, metalurgia leve", grauEstimado: 3 },
  { id: "transporte", rotulo: "Transporte e logística", exemplos: "transportadora, entregas, armazenagem", grauEstimado: 3 },
  { id: "limpeza", rotulo: "Limpeza e conservação", exemplos: "limpeza terceirizada, jardinagem, dedetização", grauEstimado: 3 },
  { id: "agro", rotulo: "Agropecuária", exemplos: "fazenda, granja, produção rural", grauEstimado: 3 },
  { id: "oficina", rotulo: "Oficina e manutenção", exemplos: "mecânica, elétrica, refrigeração, assistência técnica", grauEstimado: 3 },
  { id: "construcao", rotulo: "Construção civil", exemplos: "construtora, reforma, instalações", grauEstimado: 4 },
];

export function setorPorId(id: string): Setor | undefined {
  return SETORES.find((s) => s.id === id);
}
