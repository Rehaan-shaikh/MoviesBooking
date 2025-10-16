import express from "express";
import { addShow, getActiveShows, getMovieShowsByDate, getNowPlayingMovies, searchMoviesByTitle } from "../controller/ShowController.js";

const router = express.Router();

router.get("/now-playing" , getNowPlayingMovies);
router.post("/addShow" , addShow);
router.get("/getActiveShows" , getActiveShows);
router.get("/shows/:movieId/:date", getMovieShowsByDate);
router.post("/movie-search",searchMoviesByTitle);


export default router;
