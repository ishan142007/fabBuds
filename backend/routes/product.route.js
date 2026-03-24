import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct  } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/:id", getProductById); 

export default router;