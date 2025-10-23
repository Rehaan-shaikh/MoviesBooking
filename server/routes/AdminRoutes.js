import express from "express";
import { dashboardData } from "../controller/AdminDashboard.js";
import { listShows } from "../controller/ListShowsController.js";

const router = express.Router();

router.get("/" , dashboardData);
router.get("/list-shows" , listShows);



export default router;
