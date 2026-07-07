import { corsHeaders } from "../config/env.mjs";
import { chat } from "../services/chatService.mjs";

export const chatHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(event, ["POST", "OPTIONS"]),
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders(event, ["POST", "OPTIONS"]),
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { message } = JSON.parse(event.body);

    const reply = await chat(message);

    return {
      statusCode: 200,
      headers: corsHeaders(event, ["POST", "OPTIONS"]),
      body: JSON.stringify(reply),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders(event, ["POST", "OPTIONS"]),
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};
