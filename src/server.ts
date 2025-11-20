// server.ts
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import gameRouter from "./controllers/game.controller.js";

dotenv.config();

const app = express();
app.use(express.json());

// rotas da API
app.use("/api/jogo", gameRouter);

// rota raiz simples
app.get("/", (_, res) =>
  res.json({ status: "ok", message: "apibet1 - backend (TS)" })
);

// Conectar ao MongoDB (somente se MONGO_URI existir)
const MONGO = process.env.MONGO_URI || "";
if (MONGO.length > 0) {
  mongoose
    .connect(MONGO)
    .then(() => console.log("✅ MongoDB conectado"))
    .catch((err) => console.error("❌ Erro Mongo:", err.message));
} else {
  console.warn(
    "⚠️ MONGO_URI não definido — rodando sem banco (somente testes)"
  );
}
//teste

// Rodar localmente (mas não na Vercel)
if (process.env.NODE_ENV !== "production") {
  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () =>
    console.log(`🚀 Servidor local: http://localhost:${port}`)
  );
}

// obrigatório para serverless (Vercel)
export default app;
