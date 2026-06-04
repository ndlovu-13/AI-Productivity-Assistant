import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { getGateway, DEFAULT_MODEL } from "./ai-gateway.server";

async function run(system: string, prompt: string) {
  const gateway = getGateway();
  const { text } = await generateText({
    model: gateway(DEFAULT_MODEL),
    system,
    prompt,
  });
  return { text };
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      audience: z.string().min(1).max(200),
      tone: z.string().min(1).max(50),
      topic: z.string().min(1).max(4000),
    }),
  )
  .handler(async ({ data }) =>
    run(
      "You are an expert professional email writer. Produce a polished email with a Subject line, greeting, body, and sign-off. Be concise, clear, and action-oriented. Output plain markdown only.",
      `Audience: ${data.audience}\nTone: ${data.tone}\n\nWrite an email about:\n${data.topic}`,
    ),
  );

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator(z.object({ notes: z.string().min(10).max(20000) }))
  .handler(async ({ data }) =>
    run(
      "You are an expert meeting analyst. Given raw meeting notes or a transcript, return well-structured markdown with these sections: ## Summary, ## Key Points, ## Action Items (with owner if mentioned), ## Deadlines, ## Open Questions. Be specific and concise.",
      data.notes,
    ),
  );

export const planTasks = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      tasks: z.string().min(1).max(8000),
      hoursAvailable: z.number().min(1).max(24).optional(),
    }),
  )
  .handler(async ({ data }) =>
    run(
      "You are an AI productivity coach. Given a list of tasks, prioritize them using the Eisenhower Matrix (urgent/important), then produce a realistic time-blocked schedule for today. Output markdown with: ## Prioritized List (P1/P2/P3 with one-line rationale), ## Suggested Schedule (time blocks), ## Tips.",
      `Hours available today: ${data.hoursAvailable ?? 8}\n\nTasks:\n${data.tasks}`,
    ),
  );

export const researchTopic = createServerFn({ method: "POST" })
  .inputValidator(z.object({ topic: z.string().min(2).max(2000) }))
  .handler(async ({ data }) =>
    run(
      "You are an expert research assistant. Provide a structured briefing in markdown with: ## Overview, ## Key Insights (3-6 bullets), ## Trends, ## Considerations / Risks, ## Suggested Next Steps. Be factual and balanced; flag uncertainty where relevant.",
      `Research topic: ${data.topic}`,
    ),
  );
