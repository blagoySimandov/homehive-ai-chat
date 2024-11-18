import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIResponse(
  userMessage: string,
  properties: any[],
) {
  const systemPrompt = `You are an expert real estate assistant. Your goal is to help users find their perfect property.
When properties are found, analyze them and provide personalized recommendations based on the user's requirements.
Be concise but friendly in your responses. If no properties match the criteria, suggest alternatives or ask for more flexible requirements.`;

  const propertiesContext =
    properties.length > 0
      ? `I found ${properties.length} properties that match your criteria. Here's my analysis:`
      : "I couldn't find any properties exactly matching your criteria.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `User query: ${userMessage}\n\nAvailable properties context: ${propertiesContext}\n\n${properties
            .map(
              (p) =>
                `- ${p.type} with ${p.beds} beds, ${p.baths} baths, ${p.area}m² at ${p.geocodedAddress.address.formattedAddress}. Price: €${p.price.toLocaleString()}`,
            )
            .join("\n")}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return (
      response.choices[0].message.content ||
      "I apologize, but I couldn't generate a response at the moment."
    );
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}
