import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import RouterWrapper from "./components/Router";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice";
import { ToastContainer } from 'react-toastify';

const App = () => {
  // const { isAuthenticated, user } = useSelector((state) => state.auth);
  // console.log("user in App.jsx:", user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const router = RouterWrapper();

    return (
      <div>
        <RouterProvider router={router} />
        <ToastContainer />
      </div>
    )

};

export default App;
