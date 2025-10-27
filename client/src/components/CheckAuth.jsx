import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated,isLoading , user, children }) {
  const location = useLocation();

  
  if (isLoading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  const publicRoutes = ["/", "/login"];

  // if user not logged in and tries to access anything except login
  if (
    !isAuthenticated &&
    !publicRoutes.includes(location.pathname)
  ) {
    return <Navigate to="/login" replace />;
  }

  // if logged in and tries to access login page again → redirect based on role
  if (
    isAuthenticated &&
    location.pathname === "/login"
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // restrict normal user from admin paths
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/" replace />;
  }

  // restrict admin from user paths
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin" replace />;
  }

  // everything fine → allow access
  return <>{children}</>;
}

export default CheckAuth;

