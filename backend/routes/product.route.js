import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProductByUserId  } from "../controllers/product.controller.js";
import { verifyToken } from "../Middleware/verifyToken.middle.js";
import { authrole } from "../Middleware/role.middle.js";

const router = express.Router();

router.post("/create",verifyToken,authrole("admin","seller"), createProduct);
router.get("/user",verifyToken,authrole("admin","seller"),getProductByUserId)
router.get("/", getAllProducts); 
router.put("/update/:id",verifyToken,authrole("admin","seller"), updateProduct);
router.delete("/delete/:id",verifyToken,authrole("admin","seller"), deleteProduct);
router.get("/:id", getProductById); 

export default router;