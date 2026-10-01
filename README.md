# Devizando — site profissional

Site institucional da **Devizando** (https://devizando.com): portfólio de serviços de
desenvolvimento de sites, sistemas, automações e soluções com inteligência artificial.

Feito para captar contatos comerciais, com cena 3D interativa, conteúdo em PT-BR,
SEO completo e formulário com envio real (sem simulação).

---

## Stack

- **Next.js 15** (App Router, TypeScript) — páginas, SEO e API do formulário
- **React Three Fiber + Three.js** — cena 3D interativa do hero (geometria procedural, sem modelos externos)
- **CSS puro** com variáveis (sem framework de estilo) — `src/app/globals.css` + `*.module.css`
- **Docker** (multi-stage, saída `standalone`) — deploy na Coolify
- Fontes locais (Space Grotesk, IBM Plex Sans/Mono) — nenhuma requisição externa em runtime

## Estrutura

```
src/
  app/
    layout.tsx          # metadados, SEO, JSON-LD, cabeçalho/rodapé
    page.tsx            # página inicial (todas as seções)
    privacidade/        # política de privacidade
    api/contato/        # endpoint do formulário (validação + antispam + entrega)
    api/health/         # rota de saúde para monitoramento
    sitemap.ts, robots.ts, globals.css
  components/           # Hero (3D), Services, Portfolio, Process, About, Faq, Contact, Footer…
  lib/
    site.ts             # TODO o conteúdo editável (textos, serviços, projetos, FAQ, contatos)
    contact.ts          # provedores de envio (resend, formsubmit, smtp)
    rate-limit.ts       # limite de requisições por IP
public/
  fonts/                # fontes locais (woff2)
  og-image.png          # imagem de compartilhamento (1200x630)
  icon.svg
```

**Quer mudar um texto?** Edite `src/lib/site.ts` — serviços, projetos, processo, FAQ e
contatos estão todos nesse arquivo.

---

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
npm run start      # serve o build
npm run typecheck  # checagem de tipos
```

---

## Formulário de contato (entrega real)

O formulário **só aparece** quando existe um provedor de entrega configurado.
Sem provedor, o site mostra um aviso honesto e o link de e-mail — nunca simula envio.

| Provedor    | Variáveis de ambiente                                              | Observação |
|-------------|--------------------------------------------------------------------|------------|
| `formsubmit`| `CONTACT_PROVIDER=formsubmit`, `CONTACT_TO=<e-mail destino>`       | Sem cadastro. Requer **1 clique de ativação** no e-mail recebido na primeira submissão. |
| `resend`    | `CONTACT_PROVIDER=resend`, `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | Recomendado para produção (entrega rastreável). |
| `smtp`      | `CONTACT_PROVIDER=smtp`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`, `CONTACT_FROM` | Qualquer SMTP (ex.: senha de app do Gmail). |

Proteções aplicadas em `src/app/api/contato/route.ts`:

- validação no servidor (Zod) com mensagens em PT-BR
- honeypot (campo invisível: robôs preenchem e recebem sucesso falso, sem envio)
- limite de 6 envios por hora por IP (memória do processo)
- limite de tamanho de payload (20 KB)

### Pendências registradas

- **WhatsApp comercial**: não foi encontrado número nos materiais disponíveis, então o botão
  de WhatsApp fica oculto. Para ativar, defina `NEXT_PUBLIC_WHATSAPP=5511999999999`.
- **Formulário**: ative o formulário clicando no link de ativação enviado pelo FormSubmit
  (ou troque para `resend`/`smtp` nas variáveis de ambiente do Coolify).

---

## Deploy (Coolify)

1. Crie um **Application** apontando para este repositório (branch `main`).
2. Build pack: **Dockerfile** (o repositório já tem `Dockerfile`).
3. Porta interna: **3000**.
4. Domínio: `https://devizando.com` (o DNS `A`/`CNAME` precisa apontar para a VPS).
5. Variáveis de ambiente (aba *Environment Variables*):

```
CONTACT_PROVIDER=formsubmit
CONTACT_TO=leandrolima2107@gmail.com
NEXT_PUBLIC_CONTACT_EMAIL=leandrolima2107@gmail.com
NEXT_PUBLIC_SITE_URL=https://devizando.com
# NEXT_PUBLIC_WHATSAPP=5511999999999   (opcional, quando houver número)
```

6. Deploy e verificação: `curl -s https://devizando.com/api/health` deve responder `{"ok": true}`.

As variáveis `NEXT_PUBLIC_*` são lidas no **build** — se você mudar alguma, faça um novo deploy.

---

## Manutenção

- **Textos e conteúdo**: `src/lib/site.ts`
- **Cores e tipografia**: `src/app/globals.css` (variáveis no topo do arquivo)
- **Cena 3D**: `src/components/Scene3D.tsx` e `src/components/sceneTextures.ts`
- **Novo projeto no portfólio**: adicione um item em `projects` em `src/lib/site.ts`
- **Privacidade**: `src/app/privacidade/page.tsx`

O site não usa cookies de rastreamento nem ferramentas de análise de comportamento.
