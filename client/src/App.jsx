import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import RouterWrapper from "./components/Router";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice";

const App = () => {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log("user in App.jsx:", user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const router = RouterWrapper();

  return <RouterProvider router={router} />;
};

export default App;
