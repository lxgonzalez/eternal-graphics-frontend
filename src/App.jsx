import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { ProductProvider } from './service/ProductContext'; 
import { CategoryProvider } from './service/CategoryContext';

function App() {
  return (
    <ProductProvider>
      <CategoryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
      </CategoryProvider>
    </ProductProvider>
  );
}

export default App;
