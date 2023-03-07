import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../server.js";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log("\nTEXT: ", text);
    res.status(200).json({ text: text });
  } catch (error) {
    console.error("\nERROR: ", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
