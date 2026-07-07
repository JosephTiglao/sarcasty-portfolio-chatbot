import express from "express";
import { chat } from "./src/services/chatService.mjs";
import { handShakeHandler } from "./src/handlers/handShake.mjs";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: false,
  }),
);

app.use(express.json());

app.get("/", async (req, res) => {
  console.log("Handshake ok");

  const response = await handShakeHandler({
    httpMethod: req.method,
    headers: req.headers,
  });

  res.status(response.statusCode).send(JSON.parse(response.body));
});

app.post("/chat", async (req, res) => {
  const message = req.body?.message?.trim();

  if (!message) {
    return res.status(400).json({ error: "message is required" });
  }

  try {
    const response = await chat(message);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000);
