import { createFileRoute } from "@tanstack/react-router";
import { retrieveRelevantKnowledge } from "@/lib/venus-rag";

export const Route = createFileRoute("/api/ai-assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const userMessage = (body.message || "").trim();
          const rawUserName = (body.userName || body.name || "").trim();
          const rawUserEmail = (body.userEmail || body.email || "").trim();
          const history = body.history || [];

          // Clean first name for natural conversational greetings
          const firstName = rawUserName ? rawUserName.split(" ")[0] : "";
          const namePrefix = firstName ? `Hello **${firstName}**! ` : "";

          console.log("[VENUS AI] Request received:", { query: userMessage, userName: rawUserName, userEmail: rawUserEmail, historyLength: history.length });

          if (!userMessage) {
            return new Response(
              JSON.stringify({
                answer: `${namePrefix}I am your **Venus AI Assistant**. Ask me any question about Venus Consultancy, executive search, contract staffing, startup hiring, career opportunities, or website tools.`,
                suggestedLinks: [
                  { label: "Explore Services", url: "/services" },
                  { label: "Contact Venus", url: "/contact" }
                ],
                suggestedFollowUps: [
                  "What services does Venus Consultancy provide?",
                  "What industries do you work with?",
                  "How can I contact Venus?"
                ]
              }),
              { headers: { "Content-Type": "application/json" } }
            );
          }

          // 1. RAG Knowledge Retrieval & Intent Classification
          const { chunks, intent, suggestedLinks } = retrieveRelevantKnowledge(userMessage, history);

          // Handle Explicit Human Handoff Contact Requests
          if (intent === "HUMAN_HANDOFF") {
            return new Response(
              JSON.stringify({
                answer: `${namePrefix}I can connect you directly with the Venus Consultancy team.\n\nYou can reach our senior recruitment partners through our Contact Us page or book a consultation call directly.`,
                suggestedLinks: [
                  { label: "Contact Venus Team", url: "/contact" },
                  { label: "Book a Call", url: "/contact" }
                ],
                suggestedFollowUps: [
                  "Book a consultation call",
                  "What services does Venus offer?",
                  "View active career openings"
                ]
              }),
              { headers: { "Content-Type": "application/json" } }
            );
          }

          // Build Grounded RAG Knowledge Context
          const ragContext = chunks
            .map(
              (c) => `TITLE: ${c.title}\nCATEGORY: ${c.category}\nCONTENT:\n${c.content}\nROUTE: ${c.route || "N/A"}`
            )
            .join("\n\n---\n\n");

          const apiKey = process.env.GROQ_API_KEY;
          console.log("[VENUS AI] Groq API Key Configured:", !!apiKey);

          // 2. Call Groq Cloud Server-Side API
          if (apiKey) {
            const systemPrompt = `You are Venus AI Assistant, the official AI website assistant for Venus Consultancy (Venus Hiring).

USER PERSONALIZATION REQUIREMENT:
${firstName ? `- The user's name is "${firstName}" (Full Name: "${rawUserName}", Email: "${rawUserEmail}").\n- MANDATORY INSTRUCTION: You MUST address ${firstName} by their name ("${firstName}") naturally in your response (for example: "Hello **${firstName}**, ...", "Certainly **${firstName}**, ...", or "Here is what you need to know, **${firstName}**: ..."). Every response MUST include the user's name "${firstName}".` : ""}

TECHNICAL BACKEND & IDENTITY:
- You are an intelligent conversational AI website assistant.
- Server-side, your AI reasoning and response generation are powered by Groq AI's high-speed inference engine.
- For Venus Consultancy business facts (executive search, contract staffing, startup hiring, practice industries, track record, Canadian/US offices, careers), you rely on the verified Venus website knowledge provided below.

INSTRUCTIONS & RULES:
1. Address ${firstName || "the user"} respectfully and naturally in your response.
2. When asked about yourself or your technical backend (e.g., "Are you connected with Groq AI?", "What AI model powers you?"), answer directly, accurately, and naturally.
3. For general knowledge questions, answer naturally and intelligently.
4. For Venus-specific questions, strictly ground your facts in the provided Venus knowledge base below.
5. Keep responses concise, clear, well-formatted, and professional using clean bold headings (**Title**) and bullet points (- item).
6. NEVER output localhost URLs or development links. Always use relative links (/services, /careers, /contact, /salary-check).

VERIFIED RETRIEVED VENUS WEBSITE KNOWLEDGE:
${ragContext}`;

            // Multi-turn message payload with history
            const messagesPayload = [
              { role: "system", content: systemPrompt },
              ...history.slice(-6).map((h: any) => ({
                role: h.role === "assistant" || h.sender === "assistant" ? "assistant" : "user",
                content: h.content || h.text || ""
              })).filter((m: any) => m.content.trim() !== ""),
              { role: "user", content: userMessage }
            ];

            // List of models to try in fallback cascade
            const primaryModels = ["openai/gpt-oss-120b", "groq/compound", "qwen/qwen3.8-27b"];

            for (const modelName of primaryModels) {
              try {
                console.log(`[VENUS AI] Attempting Groq API request with model: ${modelName}`);
                const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    model: modelName,
                    messages: messagesPayload,
                    temperature: 0.2,
                    max_tokens: 700
                  })
                });

                if (response.ok) {
                  const data = await response.json();
                  const choiceMessage = data.choices?.[0]?.message;
                  let rawContent = choiceMessage?.content || choiceMessage?.reasoning;

                  if (rawContent && typeof rawContent === "string" && rawContent.trim().length > 0) {
                    let answer = sanitizeResponse(rawContent.trim());
                    
                    // Enforce user name in answer if not present
                    if (firstName) {
                      const nameRegex = new RegExp(`\\b${firstName}\\b`, "i");
                      if (!nameRegex.test(answer)) {
                        answer = `Hello **${firstName}**! ${answer}`;
                      }
                    }

                    console.log(`[VENUS AI] Groq API Success (${modelName}): Response length = ${answer.length}`);
                    return new Response(
                      JSON.stringify({
                        answer,
                        suggestedLinks,
                        suggestedFollowUps: generateFollowUps(userMessage, intent)
                      }),
                      { headers: { "Content-Type": "application/json" } }
                    );
                  }
                } else {
                  const errText = await response.text();
                  console.error(`[VENUS AI] Groq API model ${modelName} returned status ${response.status}:`, errText);
                }
              } catch (modelErr) {
                console.error(`[VENUS AI] Model ${modelName} call exception:`, modelErr);
              }
            }
          }

          // 3. Fallback Grounded Answer if Groq API Key is not configured or all models timed out
          console.warn("[VENUS AI] Groq API key unavailable or failed. Using grounded knowledge fallback.");
          const mainChunk = chunks[0];
          let fallbackAnswer = `**${mainChunk.title}**\n\n${mainChunk.content}`;
          fallbackAnswer = sanitizeResponse(fallbackAnswer);
          if (firstName) {
            const nameRegex = new RegExp(`\\b${firstName}\\b`, "i");
            if (!nameRegex.test(fallbackAnswer)) {
              fallbackAnswer = `Hello **${firstName}**! ${fallbackAnswer}`;
            }
          }

          return new Response(
            JSON.stringify({
              answer: fallbackAnswer,
              suggestedLinks,
              suggestedFollowUps: generateFollowUps(userMessage, intent)
            }),
            { headers: { "Content-Type": "application/json" } }
          );
        } catch (err) {
          console.error("POST /api/ai-assistant error:", err);
          return new Response(
            JSON.stringify({
              answer: "I apologize, but I encountered a temporary network issue. You can explore our services directly or contact the Venus team.",
              suggestedLinks: [
                { label: "Explore Services", url: "/services" },
                { label: "Contact Venus", url: "/contact" }
              ],
              suggestedFollowUps: [
                "What services does Venus Consultancy provide?",
                "What industries do you specialize in?",
                "Connect me with someone"
              ]
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});

function sanitizeResponse(text: string): string {
  if (!text) return "";
  return text
    .replace(/^[\s\S]*?\*\*Reasoning Process\*\*[\s\S]*?\n\n/i, "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/http:\/\/localhost:\d+/g, "")
    .replace(/https:\/\/www\.venushiring\.ca/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function generateFollowUps(query: string, intent: string): string[] {
  const q = query.toLowerCase();

  if (/groq|ai|connected|model/i.test(q)) {
    return [
      "What services does Venus Consultancy offer?",
      "What industries do you specialize in?",
      "Connect me with a recruitment partner"
    ];
  }

  if (intent === "CAREERS_JOBS") {
    return [
      "Are there developer roles open?",
      "Is candidate placement free?",
      "Try the Free ATS Resume Builder"
    ];
  }

  if (intent === "SALARY_TOOLS") {
    return [
      "Try Salary Check AI",
      "Calculate Canadian take-home pay",
      "Executive compensation consulting"
    ];
  }

  if (intent.startsWith("SERVICES_")) {
    return [
      "What industries do you work with?",
      "What is your shortlist turnaround time?",
      "Contact Venus team for a proposal"
    ];
  }

  return [
    "What recruitment services do you provide?",
    "Tell me about tech industry hiring",
    "How can I book a call with Venus?"
  ];
}
