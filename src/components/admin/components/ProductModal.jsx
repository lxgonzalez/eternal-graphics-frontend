import { useState, useContext } from "react";
import { CategoryContext } from "../../../service/CategoryContext";

const ProductModal = ({ isOpen, closeModal, handleAddProduct, newProduct, setNewProduct }) => {
  if (!isOpen) return null;

  const { categories, error } = useContext(CategoryContext);

  const [sizeName, setSizeName] = useState([]);
  const [formError, setFormError] = useState('');

  const handleSizeChange = (size) => {
    const updatedSizeName = sizeName.includes(size)
      ? sizeName.filter((s) => s !== size)
      : [...sizeName, size];

    setSizeName(updatedSizeName);

    setNewProduct({
      ...newProduct,
      sizes: ['S', 'M', 'L', 'XL'].map((size) => ({
        name: size,
        available: updatedSizeName.includes(size),
      })),
    });
  };

  const handleValidationAndSubmit = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category_id || !newProduct.img) {
      setFormError('Please fill all required fields.');
      return;
    }
    if (sizeName.length === 0) {
      setFormError('Please select at least one size.');
      return;
    }

    setFormError('');
    handleAddProduct();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>

        {formError && <p className="text-red-500 mb-2">{formError}</p>}

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={newProduct.category_id}
          onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          {categories.length === 0 && !error && (
            <option disabled>No categories available, please add one</option>
          )}
          {error ? (
            <option value="1">No connection to service (default: 1)</option>
          ) : (
            categories.map((category) => (
              <option key={category.idCategory} value={category.idCategory}>
                {category.name}
              </option>
            ))
          )}
        </select>

        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />

        <div className="mb-2">
          <h4 className="text-sm font-semibold mb-2">Sizes</h4>
          <div className="flex space-x-10">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <label key={size} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={sizeName.includes(size)}
                  onChange={() => handleSizeChange(size)}
                  className="mr-2"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end items-center space-x-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleValidationAndSubmit}
            className="bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-400"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
