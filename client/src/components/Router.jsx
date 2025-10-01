// Modern v6.4+ Data Router (createBrowserRouter) setup
// cause it Can handle loaders, actions, error boundaries, data fetching, etc and recommended for larger apps with nested routes
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import MovieDetails from "../pages/MovieDetails";
import SeatLayout from "../pages/SeatLayout";
import Favorite from "../pages/Favorite";
import MyBookings from "../pages/MyBookings";


// Create router instance
const router = createBrowserRouter(
  createRoutesFromElements(

    // Root route ("/") uses RootLayout
    // All child routes will render inside <Outlet /> of RootLayout
    <Route path="/" element={<RootLayout />}>

      {/* Default (index) route → loads Home when path is exactly "/" */}
      <Route index element={<Home />} />
      <Route path="movies" element={<Movies />} />
      <Route path=":id" element={<MovieDetails />} />
      <Route path=":date" element={<SeatLayout />} />
      <Route path="my-bookings" element={<MyBookings />} />
      <Route path="favorite" element={<Favorite />} />
    </Route>
  )
);

export default router;
