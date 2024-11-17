import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/openai";
import { mockSearchProperties } from "@/lib/mockData";

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 },
    );
  }

  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const properties = mockSearchProperties(message);
    const aiResponse = await generateAIResponse(message, properties);

    return NextResponse.json({
      content: aiResponse,
      properties,
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 },
    );
  }
}
