import express from "express";
import { createBooking , getUserBookings } from "../controller/BookingController.js";

const router = express.Router();

router.post("/create" , createBooking);
router.get("/user" , getUserBookings);


export default router;
