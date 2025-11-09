import express from "express";
import { addShow, getNowPlayingMovies, searchMoviesByTitle , getActiveShowsForUsers, getActiveShowsForAdmin, getShowsTimingByDate, getOccupiedSeats} from "../controller/ShowController.js";

const router = express.Router();

router.get("/now-playing" , getNowPlayingMovies);
router.post("/addShow" , addShow);
router.get("/getActiveShowsForAdmin" , getActiveShowsForAdmin);
router.get("/getActiveShowsForUsers" , getActiveShowsForUsers);
router.get("/shows/:movieId/:date", getShowsTimingByDate);
router.post("/movie-search",searchMoviesByTitle);
router.get("/seats/:showId" , getOccupiedSeats);



export default router;
