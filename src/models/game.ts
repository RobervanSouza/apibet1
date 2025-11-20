import { Schema, model } from "mongoose";

interface IGame {
  externalId: string; // id da API de futebol
  data: any;
  fetchedAt: Date;
}

const GameSchema = new Schema<IGame>({
  externalId: { type: String, required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  fetchedAt: { type: Date, default: () => new Date() },
});

export default model<IGame>("Game", GameSchema);
