import express from "express";
import { checkAuth, login, logout, signup } from "../controller/AuthController.js";

const router = express.Router();

// Signup route
router.post("/signup", signup);

// Login route
router.post("/login", login);

//Logout route
router.post("/logout", logout);

router.get("/checkAuth", checkAuth);

checkAuth

export default router;
