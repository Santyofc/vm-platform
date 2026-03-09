import { RateLimitResult } from "./index";

export function getRateLimitHeaders(result: RateLimitResult): HeadersInit {
  return {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": Math.max(0, result.remaining).toString(),
    "X-RateLimit-Reset": result.resetAtMs.toString(),
    // Si no tuvo éxito, agregamos Retry-After
    ...(!result.success && {
      "Retry-After": Math.ceil((result.resetAtMs - Date.now()) / 1000).toString(),
    }),
  };
}
