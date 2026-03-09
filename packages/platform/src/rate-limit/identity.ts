export function getClientIp(req: Request): string {
  // Orden recomendado para proxies (Vercel, Cloudflare, etc.)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  
  return "127.0.0.1";
}

export function buildIdentity(type: "ip" | "user", id: string): string {
  return `${type}_${id}`;
}
