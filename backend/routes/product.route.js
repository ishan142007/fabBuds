import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByUserId  } from "../controllers/product.controller.js";
import { verifyToken } from "../Middleware/verifyToken.middle.js";

const router = express.Router();

router.post("/create",verifyToken, createProduct);
router.get("/user",verifyToken,getProductByUserId)
router.get("/", getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProductById); 

export default router;