export type Origin = "user" | "assistant" | "system";

export interface ChatEntryReference {
  title: string;
  url: string;
}
export interface ChatHistoryEntry {
  origin: Origin;
  text: string;
  id: string;
  references?: ChatEntryReference[];
}

export type ChatHistory = ChatHistoryEntry[];
