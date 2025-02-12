import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const ShoppingCartContext = createContext();

// Proveedor del contexto
export const ShoppingCartProvider = ({ children }) => {
  // Obtener el carrito desde localStorage al cargar el componente
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [cart, setCart] = useState(storedCart);

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <ShoppingCartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
