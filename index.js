import express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        mensagem: "API iniciada com sucesso!"
    });
});

export const handler = serverless(app);
