import { describe, it, expect, vi } from "vitest";

vi.mock("../../../src/services/chatService.mjs", () => ({
  chat: vi.fn(),
}));

import { chat } from "../../../src/services/chatService.mjs";
import { chatHandler } from "../../../src/handlers/chat.mjs";

describe("chatHandler", () => {
  it("returns chatbot reply", async () => {
    chat.mockResolvedValue({ success: true, message: "Hello!" });

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({
        message: "Hello",
      }),
    };

    const result = await chatHandler(event);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe("Hello!");
  });

  it("returns error", async () => {
    chat.mockRejectedValue(new Error("AI Error"));

    const event = {
      httpMethod: "POST",
      body: JSON.stringify({
        text: "Hello",
      }),
    };

    const result = await chatHandler(event);

    expect(result.statusCode).toBe(500);
  });
});
