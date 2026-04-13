import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  const { label, source, tempo } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ advice: "Focus on steady time and clean articulation. You've got this!" });
  }

  const ai = new GoogleGenAI({ apiKey });
  const context = tempo ? ` at tempo ${tempo}` : "";

  const prompt = `You are a world-class percussion professor.
Provide a very short, encouraging, and expert performance tip for "${label}" from the source "${source}"${context}.

If it is a Rudiment: Focus on stick control, evenness, or specific technical mechanics of that rudiment.
If it is an Etude: Focus on musicality, phrasing, dynamics, or technical challenges typical of that specific book/author.

Keep it under 2 sentences. Be specific and encouraging.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const advice = response.text ?? "Keep a steady rhythm and listen to your dynamics!";
    return NextResponse.json({ advice });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ advice: "Focus on steady time and clean articulation. You've got this!" });
  }
}
