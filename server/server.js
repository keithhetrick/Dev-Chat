import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import { Configuration, OpenAIApi } from "openai";
import corsOptions from "./config/corsOptions.js";

import openAiRoutes from "./routes/openai.js";
import authRoutes from "./routes/auth.js";

/* ENVIRONMENT VARIABLES */
const PORT = process.env.PORT || 8000;
const ENVIRONMENT = process.env.NODE_ENV;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());

/* MIDDLEWARE */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

/* MIDDLEWARE LOGGER */
app.use(logger);

/* OPENAI CONFIG */
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

/* ROUTES */
app.use("/api/openai", openAiRoutes);
app.use("/api/auth", authRoutes);

/* ERROR HANDLING */
app.use(errorHandler);
app.use(notFound);

// error & exception handling
process.on("uncaughtException", (err) => {
  console.error("\nUNCAUGHT EXCEPTION! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

/* SERVER CONFIG */
const startServer = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`\nServer running on port ${PORT} in ${ENVIRONMENT} mode`)
    );
  } catch (err) {
    console.error("\nERROR: ", err);
  }
};
startServer();
