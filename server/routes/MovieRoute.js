import express from "express";
import { getFavourites, getMovieShowDetails, toggleFavourite } from "../controller/MovieController.js";

const router = express.Router();



//this are router endpoints for rest api group together for movies req
router.get("/getMovieShowDetails/:id" , getMovieShowDetails);
router.get("/favourate", getFavourites);
router.post("/toggleFav/:movieId", toggleFavourite);


export default router;
