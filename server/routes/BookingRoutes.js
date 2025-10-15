import express from "express";
import { createBooking, getOccupiedSeats , getUserBookings } from "../controller/BookingController.js";

const router = express.Router();

router.post("/create" , createBooking);
router.get("/seats/:showId" , getOccupiedSeats);
router.get("/user" , getUserBookings);


export default router;
