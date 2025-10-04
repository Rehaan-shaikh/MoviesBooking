import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
    const isAdminRoute = useLocation().pathname.startsWith("/admin")
    const isLoginRout = useLocation().pathname.startsWith("/login")
  return (
    <>
      {(!isAdminRoute && !isLoginRout) && <Navbar />}
      <Outlet />
      {(!isAdminRoute && !isLoginRout) && <Footer />}
    </>
  );
};

export default RootLayout;
