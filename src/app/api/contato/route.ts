import { NextResponse } from "next/server";
import { z } from "zod";
import { deliverContact, activeProvider } from "@/lib/contact";
import { rateLimit, limits } from "@/lib/rate-limit";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome.")
    .max(80, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .max(160, "E-mail muito longo."),
  company: z.string().trim().max(80, "Nome da empresa muito longo.").optional(),
  service: z
    .string()
    .trim()
    .min(1, "Escolha o serviço de interesse."),
  message: z
    .string()
    .trim()
    .min(10, "Escreva uma mensagem com pelo menos 10 caracteres.")
    .max(2000, "Mensagem muito longa."),
});

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "desconhecido";
}

export async function POST(request: Request) {
  const ip = clientIp(request);

  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Muitas mensagens em um curto período. Aguarde alguns minutos e tente novamente.",
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > limits.MAX_BODY) {
    return NextResponse.json(
      { ok: false, error: "Mensagem muito grande." },
      { status: 413 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requisição inválida." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Verifique os campos enviados." },
      { status: 400 },
    );
  }

  const { name, email, company, service, message } = parsed.data;

  // Honeypot preenchido: responde como sucesso, mas não entrega nada.
  const website = typeof raw === "object" && raw !== null && "website" in raw ? (raw as { website?: string }).website : undefined;
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!activeProvider()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "O envio pelo site está temporariamente indisponível. Fale com a gente pelo e-mail indicado nesta página.",
      },
      { status: 503 },
    );
  }

  try {
    const result = await deliverContact({ name, email, company, service, message });
    return NextResponse.json({ ok: true, id: result.id });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[contato] falha no envio:", detail);
    if (detail.includes("ENTREGA_EM_ATIVACAO")) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "O formulário está em processo de ativação. Enquanto isso, escreva para o e-mail indicado nesta página.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          "Não conseguimos enviar sua mensagem agora. Tente novamente em instantes ou use o e-mail indicado nesta página.",
      },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Método não permitido." }, { status: 405 });
}
