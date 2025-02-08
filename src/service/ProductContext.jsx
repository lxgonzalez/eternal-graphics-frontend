import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_GATEWAY}/product`;

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                    colors {
                        name
                        img
                    }
                    sizes {
                        name
                        available
                    }
                }
            }
        `
        });

        if (productsData.data.data.findAllproducts.length === 0) {
          console.log("No hay productos", productsData)
          setLoading(false);
        } else {
          setProducts(productsData.data.data.findAllproducts);
          setLoading(false);
        }
      } catch (err) {
        setError('Hubo un error al obtener los productos');
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const addProduct = async (newProduct) => {
    console.log(newProduct);

    const mutation = `
      mutation {
        addProduct(
          name: "${newProduct.name}",
          price: ${newProduct.price},
          category_id: "${newProduct.category_id}",
          img: "${newProduct.img}",
          colors: [
            ${newProduct.colors.map(
      (color) => `{ name: "${color.name}", img: "${color.img}" }`
    ).join(",")}
          ],
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
          colors {
            name
            img
          }
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

      if (response.data && response.data.data) {
        setProducts((prevProducts) => [...prevProducts, response.data.data.addProduct]);
      }
    } catch (err) {
      setError('Error al agregar el producto');
    }
  };


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
          colors: [
            ${updatedProduct.colors
        .map((color) => `{ name: "${color.name}", img: "${color.img}" }`)
        .join(",")}
          ],
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
          colors {
            name
            img
          }
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

      if (response.data && response.data.data) {
        const updatedProductData = response.data.data.updateProduct;
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProductData._id ? updatedProductData : product
          )
        );
      }
    } catch (err) {
      setError('Error al actualizar el producto');
    }
  };


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
          colors {
            name
            img
          }
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

      if (response.data && response.data.data) {
        const deletedProduct = response.data.data.deleteProduct;
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== deletedProduct._id)
        );
      }
    } catch (err) {
      setError('Error al eliminar el producto');
    }
  };


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
