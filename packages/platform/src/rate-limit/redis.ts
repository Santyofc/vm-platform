import { Redis } from "@upstash/redis";

// Validar que las credenciales existen
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redisClient = url && token ? new Redis({ url, token }) : null;

// L1 Cache: Almacena resultados en memoria del contenedor Edge
// Ahorra latencia si la misma IP pide 10 veces en 1 segundo.
export const ephemeralCache = new Map<string, number>();
