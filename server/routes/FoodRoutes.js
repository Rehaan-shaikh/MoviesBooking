import express from "express";
import upload from "../lib/multer.js";
import { addFood, getAllFoods } from "../controller/FoodController.js";

const router = express.Router();


//upload id from multer
// upload.single("image") is Multer middleware:
// It looks for a file in the form with the field name "image"
// Stores the file temporarily (on disk or memory, depending on config).
// Multer is what extracts the file from the request and gives it to req.file.
router.post("/add", upload.single("image"), addFood);

// 🍔 GET all foods
router.get("/", getAllFoods);

export default router;
