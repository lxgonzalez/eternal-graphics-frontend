import { use, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './auth/AuthContext';
import { ShoppingCartContext } from '../service/ShoppingCartContext';
import { ShoppingCartIcon, UserIcon } from '@heroicons/react/16/solid';
import ShoppingCart from '../pages/ShoppingCart';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for showing/hiding the cart
  const { userData, setUserData } = useContext(UserContext);
  const { cart } = useContext(ShoppingCartContext); // Access the cart from context
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');

    setUserData(null);
    window.location.href = '/';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(userData);
    
  }, [userData]);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-violet-400 font-light text-2xl flex">
          Eternal <span className="font-semibold">Graphics</span>
        </Link>

        {/* Account, Cart */}
        <div className="flex items-center space-x-12">
          <div className="relative">
            <div
              className="flex items-center space-x-2 hover:cursor-pointer"
              onClick={toggleDropdown}
            >
              <UserIcon className="h-6 w-6 text-gray-500 hover:text-violet-400"></UserIcon>
              <div>
                {userData ? (
                  <span>
                    {userData.givenName} {userData.familyName}
                  </span>
                ) : (
                  <span>Account</span>
                )}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
                    {userData ? (
                      <ul className="p-2">
                        <li>
                          <button
                            onClick={logout}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    ) : (
                      <ul className="space-y-2 p-2">
                        <li>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                          >
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded"
                          >
                            Register
                          </Link>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="flex items-center space-x-2 hover:cursor-pointer relative"
            onClick={toggleCart}
          >
            <ShoppingCartIcon className="h-6 w-6 text-gray-500 hover:text-violet-400"></ShoppingCartIcon>
            {cart.length > 0 && (
              <span className="absolute bottom-3 left-2 bg-violet-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </div>

          {isCartOpen && (
            <div className="absolute top-20 right-0 bg-white shadow-lg rounded-lg w-96 z-10 p-4">
              <ShoppingCart />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
