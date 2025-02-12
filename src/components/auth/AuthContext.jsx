import { createContext, useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../../service/UserFromLocalStorage';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Verificar si el usuario está en el localStorage
  useEffect(() => {
    const loggedUser = getUserFromLocalStorage();
    if (loggedUser) {
      setUserData(loggedUser); // Usamos directamente la información de localStorage
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
