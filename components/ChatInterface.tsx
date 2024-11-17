"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./chat/MessageBubble";
import ChatInput from "./chat/ChatInput";
import LoadingIndicator from "./chat/LoadingIndicator";
import PropertyGrid from "./property/PropertyGrid";
import { Message, ChatResponse } from "@/types/chat";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI real estate assistant. How can I help you find your perfect property today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data: ChatResponse = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content,
          properties: data.properties,
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I apologize, but I'm having trouble processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-neutral-900 rounded-lg shadow-lg">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <MessageBubble role={message.role} content={message.content} />
              {message.properties && (
                <PropertyGrid properties={message.properties} />
              )}
            </div>
          ))}
          {isLoading && <LoadingIndicator />}
        </div>
      </ScrollArea>
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

