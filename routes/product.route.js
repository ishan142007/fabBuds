import express from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct  } from "../controllers/product.controller";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);//perams waliii
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;