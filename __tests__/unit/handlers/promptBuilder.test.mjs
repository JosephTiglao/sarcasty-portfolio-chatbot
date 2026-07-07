import { describe, it, expect } from "vitest";
import { buildPrompt } from "../../../src/lib/promptBuilder.mjs";

describe("buildPrompt", () => {
  it("includes knowledge base", () => {
    const context = "Joseph knows AWS.";

    const prompt = buildPrompt(context);

    expect(prompt).toContain("Joseph knows AWS.");
    expect(prompt).toContain("KNOWLEDGE BASE");
    expect(prompt).toContain("Sarcas");
  });
});
