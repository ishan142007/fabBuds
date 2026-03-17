import express from "express";
import { signup,login,logout, check } from "../controllers/auth.controller.js";
import { verifyToken } from "../Middleware/verifyToken.middle.js";  

const route = express.Router();

route.post("/signup",signup);
route.post("/login",login);
route.post("/verify",verifyToken,check);
route.post("/logout",logout);

export default route;