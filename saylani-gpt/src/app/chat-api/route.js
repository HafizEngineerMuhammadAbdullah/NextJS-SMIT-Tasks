import { NextResponse } from "next/server";
import { generateAIResponse } from "@/lib/gemini";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        {
          error: "Messages are required",
        },
        {
          status: 400,
        }
      );
    }

    const answer = await generateAIResponse(messages);

    return NextResponse.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}