import { createContext, useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../../service/UserFromLocalStorage';

export const UserContext = createContext();

const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  
  const fetchUserData = async (email) => {
    try {
      const res = await fetch(`${API_GATEWAY}/client/email/${email}`);
      if (!res.ok) {
        throw new Error('Error fetching user data');
      }
      const data = await res.json();
      setUserData(data); // Set the fetched user data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loggedUser = getUserFromLocalStorage();
    if (loggedUser) {
      fetchUserData(loggedUser); // Fetch complete user data from API if logged in
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
