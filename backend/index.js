import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoute from "./routes/auth.route.js"
import productRoute from "./routes/product.route.js"
import cartRoute from "./routes/cart.route.js"
import orderRoute from "./routes/order.route.js"
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
app.listen(PORT,()=>{
    connectDB();
    console.log('Server is running on port', PORT)
})