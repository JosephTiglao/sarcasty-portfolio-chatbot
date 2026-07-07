import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../../config/env.mjs";
import { GEMINI_MODELS } from "../../config/models.mjs";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function askGemini(systemPrompt, message, onChunk) {
  for (const modelName of GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
      });

      const resultStream = await model.generateContent([systemPrompt, message]);

      return {
        success: true,
        model: modelName,
        text: resultStream.response.text(),
      };
    } catch (err) {
      console.error(`${modelName} failed`);
      console.error(err);
    }
  }

  throw new Error("All Gemini models failed.");
}
