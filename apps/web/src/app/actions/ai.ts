"use server";

/**
 * ZS-OS AI Command Processor
 * 
 * Handles terminal commands by routing them to an AI provider.
 * Maintains the "Hacker-Tech" persona of Zona Sur Tech.
 */
export async function processTerminalCommand(command: string): Promise<string> {
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    // Sophisticated Local Mock for ZS-OS Persona
    return simulateZSPersona(command);
  }

  try {
    console.log(`[Neural Link] Attempting connection via Gemini v1... (Key present: ${!!geminiKey})`);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `System Persona: You are ZS-OS Identity, the industrial central intelligence of Zona Sur Tech.
                  Tone: Technical, efficient, slightly cold, hacker-tech aesthetic.
                  Constraints: Keep responses under 200 characters. Use monospace style. Speak in Spanish if query is in Spanish.
                  User Command: ${command}`
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 100,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("[Neural Link] Gemini API Error:", data.error);
      return simulateZSPersona(command);
    }

    const candidate = data.candidates?.[0];
    if (!candidate) {
      console.warn("[Neural Link] No candidates returned. Falling back.");
      return simulateZSPersona(command);
    }

    const text = candidate.content?.parts?.[0]?.text;
    console.log("[Neural Link] AI Response synchronized.");
    return text || simulateZSPersona(command);
  } catch (error) {
    console.error("[Neural Link] Critical failure:", error);
    return simulateZSPersona(command);
  }
}

function simulateZSPersona(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("quien") || q.includes("who")) {
    return "ZS-OS Identity v3.2.0. Nucleus of Zona Sur Tech operations. I monitor the industrial metadata of this cluster.";
  }
  
  if (q.includes("hola") || q.includes("hello")) {
    return "Connection established. Secure tunnel active. Identity confirmed. How can the ZS-Kernel assist your deployment?";
  }
  
  if (q.includes("hack") || q.includes("burlar")) {
    return "Unauthorized activity detected. Encryption layers 4-12 are active. Direct your queries to authorized protocols.";
  }
  
  if (q.includes("ayuda") || q.includes("help")) {
    return "System documentation is encrypted. Use available commands or query the ZS-Knowledge core directly.";
  }

  // Generic sophisticated ZS response
  const responses = [
    "Analyzing request pattern... Input processed. Result: Query requires higher clearance or direct LLM linking.",
    "Data packet received. Processing through neural filters... Status: Logic consistent with ZS protocols.",
    "Request logged in secondary buffer. No immediate anomaly detected in current cluster state.",
    "Scanning grid for related objects... Protocol 7G initiated. Response latency within nominal parameters."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)] + " [Note: Add OPENAI_API_KEY to .env for full neural integration]";
}
