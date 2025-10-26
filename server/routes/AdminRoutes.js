import express from "express";
import { dashboardData } from "../controller/AdminDashboard.js";
import { listBookings, listShows } from "../controller/ListShowsController.js";

const router = express.Router();

router.get("/" , dashboardData);
router.get("/list-shows" , listShows);
router.get("/list-bookings" , listBookings);



export default router;
