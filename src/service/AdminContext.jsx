import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext();
const URL_API = import.meta.env.VITE_API_GATEWAY;

const apiUrl = `${URL_API}/admin`;

export const AdminProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [error, setError] = useState(null);

  const fetchEmails = async () => {
    try {
      const response = await axios.get(apiUrl);
      setEmails(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      setError("Error fetching emails");
    }
  };

  const addEmail = async (newEmail) => {
    try {
      await axios.post(apiUrl, { email: newEmail });
      fetchEmails(); 
    } catch (err) {
      setError("Error adding email");
    }
  };

  const deleteEmail = async (id) => {
    console.log(id);
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchEmails(); 
    } catch (err) {
      setError("Error deleting email");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        emails,
        error,
        addEmail,
        deleteEmail,
        fetchEmails,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
