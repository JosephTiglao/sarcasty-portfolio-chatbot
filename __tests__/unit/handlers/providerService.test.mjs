import { describe, it, expect, vi } from "vitest";

vi.mock("../../../src/services/ai/askGemini.mjs", () => ({
  askGemini: vi.fn(),
}));

vi.mock("../../../src/services/ai/askGroq.mjs", () => ({
  askGroq: vi.fn(),
}));

import { askGemini } from "../../../src/services/ai/askGemini.mjs";
import { askGroq } from "../../../src/services/ai/askGroq.mjs";
import { askAI } from "../../../src/services/ai/providerService.mjs";

describe("providerService", () => {
  it("uses Gemini first", async () => {
    askGemini.mockResolvedValue({
      success: true,
      model: "gemini-2.5-flash",
      text: "Gemini",
    });

    const result = await askAI("system", "hello");

    expect(result.text).toBe("Gemini");
  });

  it("falls back to Groq", async () => {
    askGemini.mockRejectedValue(new Error());

    askGroq.mockResolvedValue({
      success: true,
      model: "openai/gpt-oss-120b",
      text: "Groq",
    });

    const result = await askAI("system", "hello");

    expect(result.text).toBe("Groq");
  });
});
