import { askGemini } from "./askGemini.mjs";
import { askGroq } from "./askGroq.mjs";

export async function askAI(systemPrompt, message) {
  try {
    const result = await askGemini(systemPrompt, message);

    if (result?.success) {
      return result;
    }
  } catch (err) {
    console.warn("Gemini failed:", err.message);
  }

  try {
    const result = await askGroq(systemPrompt, message);

    if (result?.success) {
      return result;
    }
  } catch (err) {
    console.warn("Groq failed:", err.message);
  }

  return {
    success: false,
    error:
      "Well... every AI brain I rely on has called it a day and hit its daily limit. Try again tomorrow when they've had their beauty sleep, or contact Joseph directly if it's urgent.",
  };
}
