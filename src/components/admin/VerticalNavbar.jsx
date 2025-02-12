import { Link } from 'react-router-dom';

const VerticalNavbar = () => {
  return (
    <nav className="flex shadow-md ">
      <div className="w-64 bg-violet-50 text-gray-500 h-screen p-6 font-light text-xl">
        <ul className="space-y-4">
          <li className="group">
            <Link
              to="/admin/products"
              className="block py-2 px-4 rounded-lg transition-colors flex justify-between items-center"
            >
              Products
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline ml-2">→</span>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/admin/categories"
              className="block py-2 px-4 rounded-lg transition-colors flex justify-between items-center"
            >
              Categories
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline ml-2">→</span>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/admin/admins"
              className="block py-2 px-4 rounded-lg transition-colors flex justify-between items-center"
            >
              Admins
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline ml-2">→</span>
            </Link>
          </li>
          <li className="group">
            <Link
              to="/admin/sales"
              className="block py-2 px-4 rounded-lg transition-colors flex justify-between items-center"
            >
              Sales
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline ml-2">→</span>
            </Link>
            <Link
              to="/admin/clients"
              className="block py-2 px-4 rounded-lg transition-colors flex justify-between items-center"
            >
              Clients
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline ml-2">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
