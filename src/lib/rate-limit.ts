/**
 * Limite de requisições por IP (memória do processo).
 *
 * Protege o formulário contra envios em massa. Para um único container
 * este limite é suficiente; em escala, trocar por um armazenamento externo.
 */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60 * 60 * 1000; // 1 hora
const MAX_PER_HOUR = 6;
const MAX_BODY = 20 * 1024; // 20 KB

export function rateLimit(ip: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
  const bucket = buckets.get(ip) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);

  if (buckets.size > 5000) {
    // Evita crescimento indefinido da memória.
    for (const [key, value] of buckets) {
      if (value.hits.every((t) => now - t >= WINDOW_MS)) buckets.delete(key);
    }
  }

  if (bucket.hits.length >= MAX_PER_HOUR) {
    buckets.set(ip, bucket);
    const oldest = bucket.hits[0];
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(ip, bucket);
  return { allowed: true, retryAfterSeconds: 0 };
}

export const limits = { MAX_BODY, MAX_PER_HOUR, WINDOW_MS };
