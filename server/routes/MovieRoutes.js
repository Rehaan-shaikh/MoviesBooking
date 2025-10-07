import express from "express";
import { getNowPlayingMovies } from "../controller/MoviesController.js";

const router = express.Router();

router.get("/now-playing" , getNowPlayingMovies);

export default router;
