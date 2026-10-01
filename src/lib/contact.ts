/**
 * Envio real de mensagens do formulário de contato.
 *
 * O formulário só é exibido quando existe um provedor de entrega configurado.
 * Nada aqui simula envio: sem provedor configurado, o site não mostra formulário.
 *
 * Provedores suportados:
 *  - resend      : API HTTPS (RESEND_API_KEY, CONTACT_FROM, CONTACT_TO)
 *  - formsubmit  : relay por e-mail sem cadastro (requer ativação por e-mail)
 *  - smtp        : servidor SMTP próprio (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
 */

export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  service: string;
  message: string;
};

export type ProviderId = "resend" | "formsubmit" | "smtp";

export function activeProvider(): ProviderId | null {
  const provider = (process.env.CONTACT_PROVIDER ?? "").toLowerCase() as ProviderId;
  if (provider === "resend" && process.env.RESEND_API_KEY) return "resend";
  if (provider === "formsubmit") return "formsubmit";
  if (provider === "smtp" && process.env.SMTP_HOST && process.env.SMTP_PASS) return "smtp";
  return null;
}

export function contactDestination(): string {
  return process.env.CONTACT_TO ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
}

function renderText(p: ContactPayload): string {
  return [
    `Nome: ${p.name}`,
    `E-mail: ${p.email}`,
    `Empresa: ${p.company || "-"}`,
    `Serviço de interesse: ${p.service}`,
    "",
    p.message,
  ].join("\n");
}

async function sendWithResend(p: ContactPayload, to: string): Promise<string> {
  const from = process.env.CONTACT_FROM ?? "Devizando <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: p.email,
      subject: `Novo contato pelo site — ${p.name}`,
      text: renderText(p),
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok || !data.id) {
    throw new Error(`Falha no provedor de e-mail (${res.status}): ${data.message ?? "sem detalhe"}`);
  }
  return data.id;
}

async function sendWithFormSubmit(p: ContactPayload, to: string): Promise<string> {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // O relay exige origem web válida (o envio é feito pelo servidor, sem navegador).
      Referer: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://devizando.com"}/`,
      Origin: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devizando.com",
      "User-Agent": "Devizando-Site/1.0",
    },
    body: JSON.stringify({
      Name: p.name,
      Email: p.email,
      Empresa: p.company || "-",
      Servico: p.service,
      Message: p.message,
      _subject: `Novo contato pelo site — ${p.name}`,
    }),
  });
  const data = (await res.json().catch(() => ({}))) as { success?: string; message?: string };
  const ok = String(data.success).toLowerCase() === "true";
  if (!res.ok || !ok) {
    const message = String(data.message ?? "");
    if (/activation/i.test(message)) {
      throw new Error("ENTREGA_EM_ATIVACAO: formulário aguardando ativação por e-mail.");
    }
    throw new Error(`Falha no provedor de e-mail (${res.status}): ${message || "sem detalhe"}`);
  }
  return "formsubmit";
}

async function sendWithSmtp(p: ContactPayload, to: string): Promise<string> {
  const nodemailer = await import("nodemailer").catch(() => null);
  if (!nodemailer) throw new Error("Provedor SMTP selecionado, mas o pacote nodemailer não está instalado.");
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const info = await transport.sendMail({
    from: process.env.CONTACT_FROM ?? `Devizando <${process.env.SMTP_USER}>`,
    to,
    replyTo: p.email,
    subject: `Novo contato pelo site — ${p.name}`,
    text: renderText(p),
  });
  return info.messageId;
}

export async function deliverContact(p: ContactPayload): Promise<{ id: string; provider: ProviderId }> {
  const provider = activeProvider();
  const to = contactDestination();
  if (!provider || !to) {
    throw new Error("Nenhum provedor de entrega configurado.");
  }
  const id =
    provider === "resend"
      ? await sendWithResend(p, to)
      : provider === "formsubmit"
        ? await sendWithFormSubmit(p, to)
        : await sendWithSmtp(p, to);
  return { id, provider };
}
