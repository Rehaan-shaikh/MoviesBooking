import express from "express";
import { addShow, getActiveShows, getNowPlayingMovies } from "../controller/MoviesController.js";

const router = express.Router();

router.get("/now-playing" , getNowPlayingMovies);
router.post("/addShow" , addShow);
router.get("/getActiveShows" , getActiveShows);


export default router;
