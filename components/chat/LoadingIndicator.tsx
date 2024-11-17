"use client";

import { Bot } from "lucide-react";

export default function LoadingIndicator() {
  return (
    <div className="flex items-center space-x-2">
      <Bot className="w-6 h-6 text-neutral-400 animate-pulse" />
      <span className="text-neutral-400">Searching properties...</span>
    </div>
  );
}

