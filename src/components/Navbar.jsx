import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './auth/AuthContext';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const { userData, setUserData } = useContext(UserContext); // Access userData from context
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user'); // Adjust the key if needed based on how the user is stored

    setUserData(null); // Clear user data in context

    navigate('/'); // Redirect to homepage or login
  };

  // Function to toggle dropdown state
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-violet-400 font-light text-2xl flex">
          Eternal <span className="font-semibold">Graphics</span>
        </Link>

        {/* Account, Cart */}
        <div className="flex items-center space-x-12">
          <div className="relative">
            <div className="flex items-center space-x-2 hover:cursor-pointer" onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                {
                  userData ? (
                    <span>{userData.givenName} {userData.familyName}</span>
                  ) : (
                    <span>Account</span>
                  )
                }
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 z-10">
                    {
                      userData ? (
                        <ul className="p-2">
                          <li>
                            <button onClick={logout} className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Logout</button>
                          </li>
                        </ul>
                      ) : (
                        <ul className="space-y-2 p-2">
                          <li>
                            <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Login</Link>
                          </li>
                          <li>
                            <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded">Register</Link>
                          </li>
                        </ul>
                      )
                    }
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
