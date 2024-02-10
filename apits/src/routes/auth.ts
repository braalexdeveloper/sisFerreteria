import { Router } from "express";
import { loginCtrl, registerCtrl,logoutUser } from "../controllers/auth";

const router=Router();

router.post("/register",registerCtrl);
router.post("/login",loginCtrl);
router.get("/logout/:id",logoutUser);


export {router};