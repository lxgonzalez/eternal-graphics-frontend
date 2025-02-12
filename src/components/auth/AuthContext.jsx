import { createContext, useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../../service/UserFromLocalStorage';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedUser = getUserFromLocalStorage();
    if (loggedUser) {
      setUserData(loggedUser); 
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
