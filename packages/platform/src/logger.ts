/**
 * Minimal structured logger for operational visibility.
 */
export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    console.info(JSON.stringify({ level: "info", timestamp: new Date().toISOString(), message, ...meta }));
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    console.warn(JSON.stringify({ level: "warn", timestamp: new Date().toISOString(), message, ...meta }));
  },
  error: (message: string, error?: Error | string | unknown, meta?: Record<string, unknown>) => {
    // Prevent logging raw auth headers or full API keys
    const safeError = error instanceof Error 
      ? { message: error.message, stack: error.stack } 
      : { message: String(error) };
      
    console.error(JSON.stringify({ 
      level: "error", 
      timestamp: new Date().toISOString(), 
      message, 
      error: safeError, 
      ...meta 
    }));
  },
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.LOG_LEVEL === "debug") {
      console.debug(JSON.stringify({ level: "debug", timestamp: new Date().toISOString(), message, ...meta }));
    }
  }
};
