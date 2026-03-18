const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.json({ reply: "Please enter a message" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an e-commerce assistant. Help users find products.\nUser: ${userMessage}`,
              },
            ],
          },
        ],
      }
    );

    const reply =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (error) {
    console.log("❌ ERROR:", error.response?.data || error.message);

    res.json({
      reply: "Server error, please try again later",
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});