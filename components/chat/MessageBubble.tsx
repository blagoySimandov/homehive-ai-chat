"use client";

import { Card } from "@/components/ui/card";
import { User, Home } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-3 max-w-[98%] ${role === "user" ? "flex-row-reverse" : "flex-row"}`}
    >
      <div className="flex-shrink-0">
        {role === "user" ? (
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <Card
        className={`p-3 ${
          role === "user"
            ? "bg-blue-500 text-white"
            : "bg-neutral-100 dark:bg-neutral-800"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
      </Card>
    </div>
  );
}

