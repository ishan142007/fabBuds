import express from "express";
import { signup , login , logout , check , adminfetch, admindel, profile } from "../controllers/auth.controller.js";
import { verifyToken } from "../Middleware/verifyToken.middle.js";  
import { authrole } from "../Middleware/role.middle.js";

const route = express.Router();

route.post("/signup",signup);
route.post("/login",login);
route.post("/verify",verifyToken,check);
route.get("/profile",verifyToken,profile);
route.post("/admin/fetch",verifyToken,authrole("admin"),adminfetch);
route.post("/admin/delete",verifyToken,authrole("admin"),admindel);

route.post("/logout",logout);

export default route;