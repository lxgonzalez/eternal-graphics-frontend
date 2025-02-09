import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define the API URL for product-related operations
const API_URL = `${import.meta.env.VITE_API_GATEWAY}/product`;

// Create the Product Context
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // State to store product list
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all products when the component mounts
  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await axios.post(`${API_URL}/list`, {
          query: `
            query {
                findAllproducts {
                    _id
                    name
                    price
                    category_id
                    img
                    sizes {
                        name
                        available
                    }
                }
            }
        `
        });

        // Check if the response contains products
        if (productsData.data.data.findAllproducts.length === 0) {
          setLoading(false); // No products, stop loading
        } else {
          setProducts(productsData.data.data.findAllproducts); // Set fetched products
          setLoading(false);
        }
      } catch (err) {
        setError('There was an error fetching the products'); // Handle errors
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Add a new product to the list
  const addProduct = async (newProduct) => {
    console.log(newProduct);

    const mutation = `
      mutation {
        addProduct(
          name: "${newProduct.name}",
          price: ${newProduct.price},
          category_id: "${newProduct.category_id}",
          img: "${newProduct.img}",
          sizes: [
            ${newProduct.sizes.map(
      (size) => `{ name: "${size.name}", available: ${size.available} }`
    ).join(",")}
          ]
        ) {
          _id
          name
          price
          category_id
          img
          sizes {
            name
            available
          }
        }
      }
    `;

    try {
      const response = await axios.post(
        API_URL,
        { query: mutation },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Update state with the newly added product
      if (response.data && response.data.data) {
        setProducts((prevProducts) => [...prevProducts, response.data.data.addProduct]);
      }
    } catch (err) {
      setError('Error adding the product');
    }
  };

  // Update an existing product
  const updateProduct = async (updatedProduct) => {
    console.log(updatedProduct);
    const mutation = `
      mutation {
        updateProduct(
          id: "${updatedProduct._id}",
          name: "${updatedProduct.name}",
          price: ${updatedProduct.price},
          category_id: "${updatedProduct.category_id}",
          img: "${updatedProduct.img}",
          sizes: [
            ${updatedProduct.sizes
        .map(
          (size) =>
            `{ name: "${size.name}", available: ${size.available} }`
        )
        .join(",")}
          ]
        ) {
          _id
          name
          price
          category_id
          img
          sizes {
            name
            available
          }
        }
      }
    `;

    try {
      const response = await axios.put(
        API_URL,
        { query: mutation },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the state with the modified product
      if (response.data && response.data.data) {
        const updatedProductData = response.data.data.updateProduct;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProductData._id ? updatedProductData : product
          )
        );
      }
    } catch (err) {
      setError('Error updating the product');
    }
  };

  // Delete a product by ID
  const deleteProduct = async (productId) => {
    console.log(productId);
    const mutation = `
      mutation {
        deleteProduct(id: "${productId}") {
          _id
          name
          price
          category_id
          img
          sizes {
            name
            available
          }
        }
      }
    `;

    try {
      const response = await axios.delete(
        API_URL,
        {
          data: { query: mutation },
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(response.data);

      // Remove the deleted product from the state
      if (response.data && response.data.data) {
        const deletedProduct = response.data.data.deleteProduct;
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== deletedProduct._id)
        );
      }
    } catch (err) {
      setError('Error deleting the product');
    }
  };

  // Provide the product context to child components
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
