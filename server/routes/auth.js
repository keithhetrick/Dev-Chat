import express from "express";
import axios from "axios";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.get(
      "https://api.chatengine.io/users/me",
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );

    res.status(200).json({ success: true, response: chatEngineResponse.data });
  } catch (error) {
    console.error("\nERROR", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const chatEngineResponse = await axios.post(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: password,
      },
      {
        headers: { "Private-Key": process.env.PRIVATE_KEY },
      }
    );

    res.status(200).json({ success: true, response: chatEngineResponse.data });
  } catch (error) {
    console.error("\nERROR", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
