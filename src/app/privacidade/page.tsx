import type { Metadata } from "next";
import { LinhaDeCarga } from "@/components/marca-de-carga";

export const metadata: Metadata = {
  title: "Privacidade e LGPD",
  description:
    "O que o site do Lastro coleta (quase nada), com que base legal e quais são os seus direitos.",
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-4xl sm:text-5xl">Privacidade e LGPD</h1>
      <p className="mt-2 text-sm text-casco/60">Versão de 10/11/2026 — site institucional (fase atual)</p>
      <LinhaDeCarga className="mt-8" />

      <div className="mt-6 space-y-6 leading-relaxed text-casco/85">
        <section>
          <h2 className="text-2xl">O que este site coleta</h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Diagnóstico:</strong> as respostas (número de
              funcionários, setor, regime tributário) ficam apenas no endereço
              da página do seu navegador, para você poder compartilhar o
              resultado por link. Não identificam ninguém e não são associadas a
              você por nós.
            </li>
            <li>
              <strong>Lista de espera:</strong> se você deixar seu e-mail,
              usamos para avisar sobre o lançamento da plataforma. Base legal:
              consentimento (art. 7º, I, da LGPD). Você pode sair a qualquer
              momento respondendo a qualquer mensagem.
            </li>
            <li>
              <strong>Não usamos</strong> cookies de publicidade nem vendemos
              dados. Métricas de acesso, quando existirem, serão agregadas e com
              mascaramento de dados pessoais.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl">Seus direitos</h2>
          <p className="mt-2">
            A LGPD garante acesso, correção, eliminação e informação sobre o uso
            dos seus dados. Para exercer qualquer um deles, escreva para o
            contato indicado no rodapé — respondemos em até 15 dias.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">E quando a plataforma abrir?</h2>
          <p className="mt-2">
            A plataforma de pesquisa com colaboradores terá política própria e
            mais detalhada. Três compromissos já estão assumidos desde já: a
            resposta do trabalhador será gravada sem vínculo com a identidade
            dele (anonimização estrutural); nenhum resultado será exibido para
            grupos com menos de 5 pessoas; e nenhum dado pessoal será enviado a
            modelos de inteligência artificial. Também será dito, antes de
            qualquer resposta, que não é possível excluir uma resposta
            específica depois de enviada — porque não sabemos qual é de quem.
            Isso é consequência direta do anonimato, e preferimos dizer antes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl">Hospedagem e segurança</h2>
          <p className="mt-2">
            O site é servido com criptografia (HTTPS). Quando houver banco de
            dados, ele ficará em região São Paulo, com criptografia em trânsito
            e em repouso e registro de auditoria.
          </p>
        </section>
      </div>
    </div>
  );
}
