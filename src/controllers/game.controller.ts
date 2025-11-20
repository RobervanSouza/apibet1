import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/live", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": process.env.FOOTBALL_API_KEY!,
        },
        timeout: 8000,
      }
    );

    return res.json({
      ok: true,
      total: response.data.response.length,
      jogos: response.data.response,
    });
  } catch (error: any) {
    console.error(
      "Erro API-Football live:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      ok: false,
      error: "Erro ao consultar API externa",
      detalhe: error.response?.data || error.message,
    });
  }
});

export default router;
