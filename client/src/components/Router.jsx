import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import SeatLayout from "../pages/SeatLayout";
import Favorite from "../pages/Favorite";
import MyBookings from "../pages/MyBookings";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path=":id" element={<MovieDetails />} />
      <Route path=":date" element={<SeatLayout />} />
      <Route />
      <Route path="my-bookings" element={<MyBookings />} />
      <Route path="favorite" element={<Favorite />} />
    </Route>
  )
);

export default router;
