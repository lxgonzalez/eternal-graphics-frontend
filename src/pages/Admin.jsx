import { Routes, Route, Outlet } from 'react-router-dom';
import VerticalNavbar from "../components/admin/VerticalNavbar";
import Navbar from "../components/Navbar";
import AdminProducts from '../components/admin/pages/AdminProducts';
import AdminCategories from '../components/admin/pages/AdminCategory';
import Admins from '../components/admin/pages/Admins';

export default function Admin() {
    return (
        <>
            <Navbar />
            <div className="flex">
                <div className="w-64">
                    <VerticalNavbar />
                </div>
                <div className="flex-1 p-6">
                    <Routes>
                        <Route path="/" element={<Outlet />} />
                        <Route path="/products" element={<AdminProducts />} />
                        <Route path="/categories" element={<AdminCategories />} />
                        <Route path="/admins" element={<Admins />} />
                    </Routes>
                </div>
            </div>
        </>
    );
}
