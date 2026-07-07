import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../../config/env.mjs";
import { GROQ_MODELS } from "../../config/models.mjs";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export async function askGroq(systemPrompt, message, onChunk) {
  for (const model of GROQ_MODELS) {
    try {
      const chatCompletion = await groq.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      });

      return {
        success: true,
        model: model,
        text: chatCompletion.choices[0].message.content,
      };
    } catch (err) {
      console.error(`${model} failed`);
      console.error(err);
    }
  }

  throw new Error("All Groq models failed.");
}
