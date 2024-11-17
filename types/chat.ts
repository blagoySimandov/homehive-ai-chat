import { Property } from "./property";
export interface Message {
  role: "user" | "assistant";
  content: string;
  properties?: Property[];
}

export interface ChatResponse {
  content: string;
  properties: Property[];
}

