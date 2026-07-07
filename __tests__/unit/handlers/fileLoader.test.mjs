import { describe, it, expect } from "vitest";
import { loadJson } from "../../../src/lib/fileLoader.mjs";

describe("loadJson", () => {
  it("loads skills.json", () => {
    const skills = loadJson("skills.json");

    expect(skills).toBeDefined();
    expect(typeof skills).toBe("object");

    expect(skills).toHaveProperty("frontend");
    expect(skills).toHaveProperty("backend");
    expect(skills).toHaveProperty("databases");
    expect(skills).toHaveProperty("tools");

    expect(skills.frontend.frameworks).toHaveProperty("React");
    expect(skills.backend.frameworks).toHaveProperty("Node.js");
  });

  it("throws when file doesn't exist", () => {
    expect(() => loadJson("missing.json")).toThrow();
  });
});
