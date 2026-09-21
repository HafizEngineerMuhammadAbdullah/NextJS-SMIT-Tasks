import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}


const ai = new GoogleGenAI({
  apiKey,
});

export async function generateAIResponse(messages) {
  // Validate messages
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("No messages provided.");
  }

  // Convert frontend messages to Gemini format
  const contents = messages
    .filter(
      (message) =>
        message &&
        typeof message.content === "string" &&
        message.content.trim() !== ""
    )
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [
        {
          text: message.content.trim(),
        },
      ],
    }));

  if (contents.length === 0) {
    throw new Error("No valid message content provided.");
  }

  // Retry temporary Gemini server errors
  const maxRetries = 3;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",

        contents,

        config: {
          systemInstruction: `
                        You are MyGPT, a simple and helpful AI assistant.

                        Answer the user's question directly and clearly.

                        Rules:
                        - Keep responses short and simple.
                        - Give only the information needed.
                        - Do not over-explain.
                        - Use easy language.
                        - For simple questions, give simple answers.
                        - For coding questions, provide the necessary code with a brief explanation.
                        - Do not repeat the user's question.
                        - Use Markdown when useful.
                        - Never expose API keys, passwords, or secrets.
                         `,

          temperature: 0.5,
          maxOutputTokens: 1024,
        },
      });

      if (!response || !response.text) {
        throw new Error("Gemini returned an empty response.");
      }

      return response.text;

    } catch (error) {
      console.error(
        `Gemini attempt ${attempt + 1} failed:`,
        error
      );

      // Retry temporary server overload
      if (error.status === 503 && attempt < maxRetries) {
        const delay = 2000 * Math.pow(2, attempt);

        console.log(
          `Gemini is busy. Retrying in ${delay / 1000} seconds...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );

        continue;
      }

      // Invalid request
      if (error.status === 400) {
        throw new Error(
          "Invalid request sent to Gemini. Please check the message format."
        );
      }

      // Permission / API key issue
      if (error.status === 401 || error.status === 403) {
        throw new Error(
          "Gemini API access denied. Check your API key and project settings."
        );
      }

      // Rate limit
      if (error.status === 429) {
        throw new Error(
          "Gemini rate limit reached. Please try again later."
        );
      }

      throw error;
    }
  }

  throw new Error(
    "Gemini is temporarily unavailable. Please try again later."
  );
}