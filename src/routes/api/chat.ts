import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getGateway, DEFAULT_MODEL } from "@/lib/ai-gateway.server";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as { messages?: UIMessage[] };
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }

        const gateway = getGateway();
        const result = streamText({
          model: gateway(DEFAULT_MODEL),
          system:
            "You are a helpful AI workplace productivity assistant. Help users with emails, meetings, planning, research, and general work questions. Be concise, structured, and professional. Use markdown formatting when helpful.",
          messages: await convertToModelMessages(messages),
        });

        return result.toUIMessageStreamResponse({ originalMessages: messages });
      },
    },
  },
});
