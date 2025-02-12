import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Get the user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));

  // If there is no user or the user is not an admin, redirect to home
  if (!userData || userData.rol !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children; // If the user is an admin, allow access to the route
};

export default ProtectedRoute;
