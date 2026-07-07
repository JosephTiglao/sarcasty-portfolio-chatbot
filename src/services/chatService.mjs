import { buildPrompt } from "../lib/promptBuilder.mjs";
import { askAI } from "./ai/providerService.mjs";
import { knowledge } from "./knowledgeService.mjs";

export async function chat(message) {
  const context = JSON.stringify(knowledge);

  const prompt = buildPrompt(context);

  return await askAI(prompt, message);
}
