import express from "express";
import { getFavourites, getMovieShowDetails, toggleFavourite } from "../controller/MovieController.js";

const router = express.Router();

router.get("/getMovieShowDetails/:id" , getMovieShowDetails);
router.get("/favourate", getFavourites);
router.post("/toggleFav/:movieId", toggleFavourite);


export default router;
