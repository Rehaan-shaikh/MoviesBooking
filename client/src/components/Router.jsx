// Modern v6.4+ Data Router (createBrowserRouter) setup
// cause it Can handle loaders, actions, error boundaries, data fetching, etc and recommended for larger apps with nested routes
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout.jsx";
import Home from "../pages/Home.jsx";
import Movies from "../pages/Movies.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import SeatLayout from "../pages/SeatLayout.jsx";
import Favorite from "../pages/Favorite.jsx";
import MyBookings from "../pages/MyBookings.jsx";
import Auth from "../pages/Auth.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import ListShows from "../pages/admin/ListShows.jsx";
import ListBookings from "../pages/admin/ListBookings.jsx";
import AddShow from "../pages/admin/AddShow.jsx";

// Create router instance
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root route ("/") uses RootLayout */}
      {/* All child routes will render inside <Outlet /> of RootLayout */}
      <Route path="/" element={<RootLayout />}>
        {/* Default (index) route → loads Home when path is exactly "/" */}
        <Route index element={<Home />} />
        <Route path="movies" element={<Movies />} />
        {/* later try to make another outlet for movies */}
        <Route path="movies/:id" element={<MovieDetails />} />
        <Route path=":date" element={<SeatLayout />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="favorite" element={<Favorite />} />
        <Route path="login" element={<Auth />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="shows" element={<ListShows />} />
        <Route path="bookings" element={<ListBookings />} />
        <Route path="add-show" element={<AddShow />} />
      </Route>
    </>
  )
);

export default router;
