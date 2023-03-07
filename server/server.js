import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from "./routes/openai.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* OPENAI CONFIG */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

/* ROUTES */
app.use("/api/openai", openAiRoutes);

/* SERVER CONFIG */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`\nServer running on port ${PORT}`));
