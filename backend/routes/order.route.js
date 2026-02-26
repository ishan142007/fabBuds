import { createOrder,getOrder,getOrders } from "../controllers/order.controller.js";
import express from "express";
import {verifyToken} from "../Middleware/verifyToken.middle.js";
const router=express.Router();
router.post ("/create",verifyToken,createOrder);
router.post("/getOrder/:id", verifyToken, getOrder);
router.post("/getOrders", verifyToken, getOrders);
export default router;