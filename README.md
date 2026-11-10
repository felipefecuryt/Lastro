# Lastro — site (fase 0)

Gestão de risco psicossocial (NR-1) para micro e pequenas empresas.
Esta fase contém o site público: landing, **diagnóstico gratuito de obrigação**,
guias, metodologia, preços e páginas legais. Sem banco, sem login — por design
(ver `Especificação do produto` no documento do projeto).

## Rodar na sua máquina

Pré-requisito: Node.js 20+ (você já tem, pelo app do Claude).

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Outros comandos:

```bash
npm test        # testes do motor de regras (vitest)
npm run build   # build de produção
```

> Dica (Windows/OneDrive): se o `npm install` ficar lento ou o OneDrive brigar
> com a pasta `node_modules`, clique com o botão direito em `node_modules` →
> "Sempre manter neste dispositivo", ou mova o projeto para fora do OneDrive
> (ex.: `C:\dev\lastro`).

## Onde está cada coisa

| Caminho | O quê |
| --- | --- |
| `src/lib/rules/` | Motor do diagnóstico. **Toda regra normativa vive aqui**, em configuração versionada e testada — nunca nas telas |
| `src/lib/rules/diagnostico.test.ts` | 13 testes do motor (`npm test`) |
| `src/lib/guias.ts` | Conteúdo dos guias, com fontes |
| `src/app/diagnostico/` | Assistente de 4 passos (estado na URL → resultado compartilhável) |
| `src/app/api/lead/route.ts` | Lista de espera — fase 0 só loga; TODO dentro do arquivo |
| `src/app/globals.css` | Tokens de design e toda a animação das cenas |
| `src/components/cena-*.tsx` | As duas cenas da home |

## Decisões que não são óbvias

- **Estado do assistente na URL**: o resultado é compartilhável por link
  (contador manda para o cliente) e o botão voltar funciona de graça.
- **Grau de risco estimado por setor**: o oficial é por CNAE (NR-4, Quadro I).
  O resultado sempre declara a estimativa. Fase 1: importar a tabela completa.
- **Suspensão do STF é configuração**: `SUSPENSAO_STF_ATIVA` em
  `src/lib/rules/diagnostico.ts`. Quando a conciliação da ADPF 1316 terminar,
  atualize ali e o site inteiro acompanha.
- **Fonte hospedada no próprio site**: Archivo variável via `@fontsource-variable`.
  Nenhuma requisição a terceiros para carregar fonte.

## Design: "a linha de carga"

Lastro é o peso no fundo do casco que mantém o navio em pé. Todo navio tem no
costado a marca de carga (disco de Plimsoll), obrigatória por lei desde 1876
porque navio sobrecarregado matava tripulação. A NR-1 psicossocial é isso para
o trabalho — e o site inteiro sai dessa imagem.

| Token | Cor | Uso |
| --- | --- | --- |
| `casco` | `#0f2439` | texto e faixas escuras |
| `mar` | `#1e7f72` | água e ação principal (os "verdes mares" do Ceará) |
| `tinta` | `#f5f8f7` | fundo |
| `zarcao` | `#bf3b2b` | **só** o que está abaixo da linha: risco e erro |
| `nevoa` | `#c9d6d4` | linhas e bordas |

- **Uma família só** (Archivo): o eixo de largura faz o display. Títulos
  condensados, como letra pintada em costado.
- **Duas cenas guiadas por rolagem**, espelhadas: em `cena-carga.tsx` a carga
  embarca, o casco afunda e o título comprime; em `cena-prova.tsx` a água desce
  enquanto passam medir, agir e provar.
- **Como funciona**: `use-scroll-progress.ts` escreve a variável CSS `--p`
  (0 a 1) na seção; toda a animação é `calc()` em `globals.css`. Sem biblioteca
  de animação e sem re-render do React.
- **Movimento reduzido**: com `prefers-reduced-motion`, as cenas viram texto em
  fluxo normal com a figura parada.
- As letras N e R ao lado do disco imitam as iniciais da certificadora nos
  navios — aqui, norma regulamentadora.

## Próximos passos (fase 0 → 1)

- [ ] Plugar a lista de espera em algo real (Resend ou planilha) — TODO em `src/app/api/lead/route.ts`
- [ ] Deploy na Vercel (importar o repositório, zero config)
- [ ] Domínio (verificar `lastro.com.br` no registro.br)
- [ ] Mais guias (1 por semana, lista no plano de go-to-market)
