import express from "express";
import { dashboardData } from "../controller/AdminDashboard.js";

const router = express.Router();

router.get("/" , dashboardData);


export default router;
