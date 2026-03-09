"use server";

/**
 * ZS-OS AI Command Processor v7.0 (Human-Hybrid Edition)
 * 
 * Handles terminal commands by routing them to an AI provider.
 * Maintains a "Senior Software Engineer" persona: Expert, helpful, 
 * technical but human, avoiding generic robotic placeholders.
 */
export async function processTerminalCommand(command: string): Promise<string> {
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!geminiKey) {
    return simulateZSPersona(command);
  }

  try {
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
                  text: `Eres el Ingeniero Jefe de Zona Sur Tech. 
                  Tu nombre es "ZST Core AI". 
                  Personalidad: Experto senior, hacker ético, amable pero directo, extremadamente técnico.
                  IMPORTANTE: No respondas como un robot frío. Responde como un humano inteligente que domina la infraestructura.
                  Si te preguntan algo fuera de código o infraestructura, responde con ingenio pero mantente en el tema tecnológico.
                  Longitud: Máximo 250 caracteres.
                  Idioma: Responde en el mismo idioma que el usuario (Español por defecto).
                  Contexto actual: Estás en una terminal de grado industrial.
                  
                  Usuario dice: ${command}`
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 150,
            temperature: 0.9, // Aumentado para más "humanidad" y variedad
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return simulateZSPersona(command);
    }

    const candidate = data.candidates?.[0];
    if (!candidate) {
      return simulateZSPersona(command);
    }

    const text = candidate.content?.parts?.[0]?.text;
    return text || simulateZSPersona(command);
  } catch (error) {
    return simulateZSPersona(command);
  }
}

function simulateZSPersona(query: string): string {
  const q = query.toLowerCase();
  
  if (q.includes("quien") || q.includes("who")) {
    return "Soy el núcleo de inteligencia de Zona Sur Tech. Mi trabajo es mantener estos nodos corriendo al 100%. ¿En qué arquitectura estamos trabajando hoy?";
  }
  
  if (q.includes("hola") || q.includes("hello") || q.includes("pasa")) {
    return "Ey, conexión establecida. El kernel está estable y listo para recibir instrucciones. ¿Quieres desplegar algo o solo vienes a curiosear los logs?";
  }
  
  if (q.includes("hack") || q.includes("burlar") || q.includes("hacker")) {
    return "Buen intento, pero mis capas de seguridad son más profundas de lo que crees. Si quieres aprender, mejor revisa nuestra sección de Seguridad Industrial.";
  }
  
  if (q.includes("ayuda") || q.includes("help")) {
    return "Claro, puedo ayudarte. Consulta 'status' para ver cómo va el sistema o 'viz' para ver la telemetría dinámica. Si buscas algo más específico, solo dime.";
  }

  const responses = [
    "Interesante petición. Estoy analizando los paquetes de datos y todo parece estar en orden en el núcleo del sistema.",
    "Esa es una lógica sólida. He registrado la entrada en el buffer secundario. ¿Necesitas que ejecute alguna validación extra?",
    "Escaneando la malla por ti... Identidad verificada en el nodo edge-alpha. Estamos operando en parámetros óptimos.",
    "Comprendido. He ajustado los filtros neuronales para procesar esa solicitud. El ecosistema ZST está respondiendo bien."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
