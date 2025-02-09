import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Payed from "./pages/Payed";
import { ProductProvider } from "./service/ProductContext";
import { CategoryProvider } from "./service/CategoryContext";
import { AdminProvider } from "./service/AdminContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

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
                  <ProtectedRoute>
                    <Payed />
                  </ProtectedRoute>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          </Router>
        </AdminProvider>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
