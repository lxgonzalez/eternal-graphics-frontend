import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CategoryContext = createContext();
const URL_API = import.meta.env.VITE_API_GATEWAY;

const apiUrl = `${URL_API}/category`;

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);


  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCategories(response.data);
    } catch (err) {
      setError("Error fetching categories");
    } finally {
      setError(null);
    }
  };

  // Add category
  const addCategory = async (newCategory) => {
    try {
      await axios.post(apiUrl, newCategory);
      fetchCategories(); // Refresh categories after adding
    } catch (err) {
      setError("Error adding category");
    }
  };

  // Update category
  const updateCategory = async (updatedCategory) => {
    try {
        await axios.put(apiUrl, updatedCategory);
        fetchCategories(); // Refresh categories after adding
      } catch (err) {
        setError("Error update category");
      }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${apiUrl}/${categoryId}`);
      fetchCategories(); // Refresh categories after deleting
    } catch (err) {
      setError("Error deleting category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
