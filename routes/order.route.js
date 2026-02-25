import { getOrder,getOrders } from "../controllers/order.controller";
import express from "express";
import verifyToken from "../Middleware/verifyToken.middle";
const router=express.Router();
router.post ("/create",verficationToken,createOrder);
router.post("/getOrder/:id", verficationToken, getOrder);
router.post("/getOrders", verficationToken, getOrders);
export default router;