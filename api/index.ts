// index.ts
import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import gameRouter from "../src/controllers/game.controller.js"; // ajuste caminho se necessário
import mongoose from "mongoose";
//teste 
dotenv.config();

const app = express();
app.use(express.json());

// rota raiz simples
app.get("/", (req, res) => {
  res.send("API rodando!");
});

// rota healthcheck: verifica chave, endpoint /live e MongoDB
app.get("/api/jogo/health", async (req, res) => {
  const health: any = {
    apiKeySet: !!process.env.FOOTBALL_API_KEY,
    liveEndpoint: false,
    mongo: "not checked",
  };

  // testar live endpoint
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": process.env.FOOTBALL_API_KEY!,
        },
        timeout: 5000,
      }
    );
    health.liveEndpoint = response.data.response.length > 0;
  } catch (err: any) {
    health.liveEndpoint = false;
    health.liveError = err.response?.data || err.message;
  }

  // testar MongoDB
  const MONGO = process.env.MONGO_URI || "";
  if (MONGO) {
    try {
      await mongoose.connect(MONGO);
      health.mongo = "connected";
    } catch (err: any) {
      health.mongo = err.message;
    }
  }

  res.json(health);
});

// registra controller -> /api/jogo/*
app.use("/api/jogo", gameRouter);

// start server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

export default app;
