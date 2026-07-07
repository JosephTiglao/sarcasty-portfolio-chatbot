import { corsHeaders } from "../config/env.mjs";

export const handShakeHandler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders(event, ["GET", "OPTIONS"]),
      body: "",
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders(event, ["GET", "OPTIONS"]),
    body: JSON.stringify({
      success: true,
      text: "Hi! I'm Sarcasty, Joseph's AI portfolio assistant. I know my way around his projects, skills, and experience, and I tend to answer with a bit of dry sarcasm. Ask away—what would you like to know?",
    }),
  };
};
