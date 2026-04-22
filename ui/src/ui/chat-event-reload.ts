import type { ChatEventPayload } from "./controllers/chat.ts";

function hasDisplayableAssistantFinalMessage(message: unknown): boolean {
  if (!message || typeof message !== "object") {
    return false;
  }
  const entry = message as Record<string, unknown>;
  const role = entry.role;
  if (typeof role === "string" && role.toLowerCase() !== "assistant") {
    return false;
  }
  return Array.isArray(entry.content) || typeof entry.text === "string";
}

export function shouldReloadHistoryForFinalEvent(payload?: ChatEventPayload): boolean {
  if (!payload || payload.state !== "final") {
    return false;
  }
  return !hasDisplayableAssistantFinalMessage(payload.message);
}
