import axios from "axios";

const API_BASE = process.env.FOOTBALL_API_BASE || ""; // ex: https://api.exemplo.com
const API_KEY = process.env.FOOTBALL_API_KEY || "";

if (!API_BASE) {
  console.warn(
    "FOOTBALL_API_BASE não definido. Endpoints externos não funcionarão até configurar."
  );
}

export async function fetchMatch(matchId: string): Promise<any> {
  if (!API_BASE) throw new Error("FOOTBALL_API_BASE não configurado");
  const url = `${API_BASE}/matches/${matchId}`; // ajuste conforme a API real
  const headers: Record<string, string> = {};
  if (API_KEY) headers["x-api-key"] = API_KEY;

  const resp = await axios.get(url, {
    headers,
    timeout: 10000,
  });

  return resp.data;
}
