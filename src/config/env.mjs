import { configDotenv } from "dotenv";

configDotenv();

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) throw new Error("Gemini api key is missing.");

export const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) throw new Error("Groq api key is missing.");

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",") ?? [];

const getCorsOrigin = (event) => {
  const requestOrigin = event.headers?.origin || event.headers?.Origin;
  return ALLOWED_ORIGINS.includes(requestOrigin)
    ? requestOrigin
    : ALLOWED_ORIGINS[0];
};

export function corsHeaders(event, methods = ["GET", "POST", "OPTIONS"]) {
  return {
    "Access-Control-Allow-Origin": getCorsOrigin(event),
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": methods.join(","),
  };
}
