import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"
import cartRoute from "./routes/cart.route.js"
import orderRoute from "./routes/order.route.js"
import axios from "axios"
import cors from "cors"

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express();
app.use(cors())

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/orders",orderRoute);

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
    console.log(" ERROR:", error.response?.data || error.message);
    console.log(error)
    res.json({
      reply: "Server error, please try again later",
    });
  }
});

app.listen(PORT,()=>{
    connectDB();
    console.log('Server is running on port', PORT)
})