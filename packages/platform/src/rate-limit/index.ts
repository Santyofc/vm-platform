import { Ratelimit } from "@upstash/ratelimit";
import { redisClient, ephemeralCache } from "./redis";

export interface RateLimitConfig {
  namespace?: string;
  identity?: string;
  maxRequests: number;
  windowSeconds?: number;
  windowMs?: number; // Compatibilidad legacy
  fallbackStrategy?: "fail-open" | "fail-closed";
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAtMs: number;
  isFallback: boolean;
}

// Almacenamos los limiters cacheados por configuración
const limiters = new Map<string, Ratelimit>();

export async function rateLimit(keyOrConfig: string | RateLimitConfig, legacyConfig?: { maxRequests: number, windowMs: number }): Promise<RateLimitResult> {
  let config: RateLimitConfig;
  let key: string;

  // Adaptador de compatibilidad para evitar breaking changes con la firma (key, config) actual
  if (typeof keyOrConfig === "string" && legacyConfig) {
    key = keyOrConfig;
    config = {
      maxRequests: legacyConfig.maxRequests,
      windowSeconds: Math.ceil(legacyConfig.windowMs / 1000),
      fallbackStrategy: "fail-open"
    };
  } else {
    config = keyOrConfig as RateLimitConfig;
    const windowSeconds = config.windowSeconds ?? Math.ceil((config.windowMs || 60000) / 1000);
    config.windowSeconds = windowSeconds;
    key = `rl:${config.namespace}:${config.identity}`;
  }

  // Handle Missing Config/Credentials gracefully
  if (!redisClient) {
    return handleFallback(config, new Error("Redis env vars missing"), key);
  }

  // Clave del caché para la instancia del limiter
  const limiterKey = `${config.maxRequests}:${config.windowSeconds}s`;
  if (!limiters.has(limiterKey)) {
    limiters.set(
      limiterKey,
      new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(config.maxRequests, `${config.windowSeconds!} s`),
        ephemeralCache,
        analytics: true,
      })
    );
  }

  const limiter = limiters.get(limiterKey)!;

  try {
    const res = await limiter.limit(key);
    return {
      success: res.success,
      limit: res.limit,
      remaining: res.remaining,
      resetAtMs: res.reset,
      isFallback: false,
    };
  } catch (error) {
    return handleFallback(config, error, key);
  }
}

function handleFallback(config: RateLimitConfig, error: unknown, key: string): RateLimitResult {
  console.error(`[RateLimit Error] Fallback triggered for ${key}`, error);
  
  const windowSecs = config.windowSeconds || 60;
  const resetMs = Date.now() + windowSecs * 1000;
  
  if (config.fallbackStrategy === "fail-closed") {
    // Cerramos la ruta por precaución estricta (ej logins)
    return { success: false, limit: config.maxRequests, remaining: 0, resetAtMs: resetMs, isFallback: true };
  } else {
    // Fail-Open (Default): Retornamos success: true para que el usuario genuino pueda usar la API
    return { success: true, limit: config.maxRequests, remaining: 0, resetAtMs: resetMs, isFallback: true };
  }
}
