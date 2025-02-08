import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import UpdateProductModal from "../components/UpdateProductModal";
import ProductModal from "../components/ProductModal";
import { useState } from "react";
import {ProductContext} from "../../../service/ProductContext";
import { useContext } from "react";
const AdminProducts = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category_id: '',
    img: '',
    colors: [],
    sizes: [],
  });
  const [updatedProduct, setUpdatedProduct] = useState(null); // State for updating a product
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the add product modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State to control the update modal

  const handleAddProduct = () => {
    addProduct(newProduct);
    setNewProduct({
      name: '',
      price: 0,
      category_id: '',
      img: '',
      colors: [],
      sizes: [],
    });
    setIsModalOpen(false); // Close the add product modal after adding
  };

  const handleUpdateProduct = (product) => {
    setUpdatedProduct(product); // Set the product to update
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  

  return (
    <div>
      <h2 className="text-2xl font-light mb-4 text-gray-800">Admin Products Management</h2>

      <button
        onClick={() => setIsModalOpen(true)} // Open the add product modal
        className="bg-pink-300 text-white px-4 py-2 mb-4 rounded flex items-center hover:bg-pink-400 transition duration-200"
      >
        <PlusIcon className="w-5 h-5 mr-2" /> Add Product
      </button>

      {/* Add Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)} // Close add product modal
        handleAddProduct={handleAddProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />

      {/* Update Product Modal */}
      {updatedProduct && (
        <UpdateProductModal
          isOpen={isUpdateModalOpen}
          closeModal={() => setIsUpdateModalOpen(false)} // Close update product modal
          product={updatedProduct}
          handleUpdateProduct={(product) => {
            updateProduct(product); // Handle the product update
            setIsUpdateModalOpen(false);
          }}
          setUpdatedProduct={setUpdatedProduct}
        />
      )}

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="flex justify-between items-center border p-4 rounded shadow-md bg-slate-50">
            <div className="flex gap-8 items-center justify-center">
              <img src={product.img} alt={product.name} className="w-16 h-16 object-cover" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600">Price: ${product.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateProduct(product)} // Open the update modal
                className="bg-yellow-300 text-white px-4 py-2 rounded flex items-center hover:bg-yellow-400 transition duration-200"
              >
                <PencilIcon className="w-5 h-5 mr-2" /> Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="bg-red-300 text-white px-4 py-2 rounded flex items-center hover:bg-red-400 transition duration-200"
              >
                <TrashIcon className="w-5 h-5 mr-2" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;