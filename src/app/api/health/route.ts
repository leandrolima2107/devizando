import { NextResponse } from "next/server";

export const runtime = "nodejs";

/** Rota de saúde usada pelo proxy/monitoramento. */
export async function GET() {
  return NextResponse.json({ ok: true, servico: "devizando-site" });
}
