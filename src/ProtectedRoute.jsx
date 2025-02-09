import { Navigate } from "react-router-dom";
import { UserContext } from "./components/auth/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
    const { userData } = useContext(UserContext);
    const user = JSON.parse(localStorage.getItem("user"));

    if (!userData && !user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default ProtectedRoute;
