import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
    const location = useLocation();
    const isAuthRoute = location.pathname.startsWith("/login");
  return (
    <>
      {!isAuthRoute && <Navbar />}
      <Outlet />
      {!isAuthRoute && <Footer />}
    </>
  );
};

export default RootLayout;
