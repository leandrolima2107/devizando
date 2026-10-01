import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description:
    'Como a Devizando coleta, usa e protege os dados enviados através deste site.',
  alternates: { canonical: '/privacidade' },
};

export default function PrivacyPage() {
  return (
    <article className="section" style={{ paddingTop: 'calc(var(--section-y) + 40px)' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <p className="eyebrow">Privacidade</p>
        <h1 className="section-title">Política de privacidade</h1>
        <p className="section-lead" style={{ marginBottom: 'var(--space-7)' }}>
          Esta página explica quais dados este site trata, para quê e quais são os seus direitos.
          Última atualização: 1º de outubro de 2026.
        </p>

        <h2>1. Quais dados são coletados</h2>
        <p>
          Este site coleta apenas os dados que você envia voluntariamente pelo formulário de
          contato: nome, e-mail, empresa (opcional), serviço de interesse e mensagem. O servidor
          também registra o endereço IP e o horário da requisição, exclusivamente para proteção
          contra envios abusivos.
        </p>

        <h2>2. Para que os dados são usados</h2>
        <p>
          Os dados são usados para responder ao seu contato, entender o seu pedido e preparar uma
          proposta quando fizer sentido. Eles não são usados para marketing, não são vendidos e não
          são compartilhados com terceiros para publicidade.
        </p>

        <h2>3. Compartilhamento</h2>
        <p>
          A mensagem enviada pelo formulário passa pelo serviço de e-mail transacional usado por
          este site, apenas para que a mensagem chegue à caixa de entrada da Devizando. Nenhum
          outro compartilhamento é feito.
        </p>

        <h2>4. Cookies e rastreamento</h2>
        <p>
          Este site não usa cookies de rastreamento, ferramentas de análise de comportamento ou
          publicidade. Não há perfilamento de visitantes.
        </p>

        <h2>5. Retenção</h2>
        <p>
          As mensagens recebidas são mantidas pelo tempo necessário para atender ao contato e às
          obrigações legais eventualmente aplicáveis. Se você pedir a exclusão, os dados são
          apagados, salvo obrigação legal de retenção.
        </p>

        <h2>6. Seus direitos (LGPD)</h2>
        <p>
          Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar
          confirmação de tratamento, acesso, correção, portabilidade, anonimização, bloqueio ou
          exclusão dos seus dados, bem como revogar o consentimento. Basta escrever para{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>7. Segurança</h2>
        <p>
          O site é publicado com HTTPS e o formulário possui validação, limite de requisições e
          proteção contra envios automáticos. Nenhum sistema é infalível, mas medidas razoáveis
          são adotadas para proteger as informações enviadas.
        </p>

        <h2>8. Alterações</h2>
        <p>
          Esta política pode ser atualizada quando houver mudança no que o site coleta ou em como
          os dados são tratados. A versão vigente é sempre a publicada nesta página.
        </p>

        <h2>9. Contato</h2>
        <p>
          Dúvidas sobre privacidade devem ser enviadas para{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <p style={{ marginTop: 'var(--space-8)' }}>
          <a className="btn btn--ghost" href="/">
            Voltar para o início
          </a>
        </p>
      </div>
    </article>
  );
}
