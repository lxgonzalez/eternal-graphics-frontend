import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { ProductProvider } from './service/ProductContext';
import { CategoryProvider } from './service/CategoryContext';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <ProductProvider>
      <CategoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Router>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
