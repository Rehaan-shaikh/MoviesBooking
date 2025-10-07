import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
import CheckAuth from "./CheckAuth.jsx";
import { useEffect } from "react";
import { checkAuth } from "../store/authSlice/index.js";

const RouterWrapper = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkAuth());
    }, [dispatch]);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log("user in Router.jsx:", user);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Auth />
            </CheckAuth>
          }
        />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <RootLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:id" element={<MovieDetails />} />
          <Route path=":date" element={<SeatLayout />} />
          <Route path="my-bookings" element={<MyBookings />} />
          <Route path="favorite" element={<Favorite />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route index element={<Dashboard />} />
            <Route path="list-shows" element={<ListShows />} />
            <Route path="list-bookings" element={<ListBookings />} />
            <Route path="add-shows" element={<AddShow />} />
        </Route>
      </>
    )
  );

  return router;
};

export default RouterWrapper;
