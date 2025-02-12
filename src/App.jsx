import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Paid from "./pages/Paid";
import { ProductProvider } from "./service/ProductContext";
import { CategoryProvider } from "./service/CategoryContext";
import { AdminProvider } from "./service/AdminContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <AdminProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/payed"
                element={
                    <Paid />
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </AdminProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
