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
| `src/app/globals.css` | Tokens de design (cores, fontes) |

## Decisões que não são óbvias

- **Estado do assistente na URL**: o resultado é compartilhável por link
  (contador manda para o cliente) e o botão voltar funciona de graça.
- **Grau de risco estimado por setor**: o oficial é por CNAE (NR-4, Quadro I).
  O resultado sempre declara a estimativa. Fase 1: importar a tabela completa.
- **Suspensão do STF é configuração**: `SUSPENSAO_STF_ATIVA` em
  `src/lib/rules/diagnostico.ts`. Quando a conciliação da ADPF 1316 terminar,
  atualize ali e o site inteiro acompanha.
- **Fontes em runtime**: as fontes do Google carregam via `<link>` com fallback
  de sistema, para o build não depender de rede.

## Próximos passos (fase 0 → 1)

- [ ] Plugar a lista de espera em algo real (Resend ou planilha) — TODO em `src/app/api/lead/route.ts`
- [ ] Deploy na Vercel (importar o repositório, zero config)
- [ ] Domínio (verificar `lastro.com.br` no registro.br)
- [ ] Mais guias (1 por semana, lista no plano de go-to-market)
