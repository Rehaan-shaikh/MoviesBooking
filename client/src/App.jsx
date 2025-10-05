import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./components/Router";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  console.log("user in App.jsx:", user);

  return <RouterProvider router={router} />;
};
export default App;



