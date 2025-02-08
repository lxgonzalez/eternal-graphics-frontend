import { PlusIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

const ProductModal = ({ isOpen, closeModal, handleAddProduct, newProduct, setNewProduct }) => {
  if (!isOpen) return null;

  const [colorName, setColorName] = useState('');
  const [colorImg, setColorImg] = useState('');
  const [sizeName, setSizeName] = useState([]);
  const [sizeAvailable, setSizeAvailable] = useState(true);

  const handleAddColor = () => {
    if (colorName && colorImg) {
      setNewProduct({
        ...newProduct,
        colors: [...newProduct.colors, { name: colorName, img: colorImg }],
      });
      setColorName('');
      setColorImg('');
    }
  };

  const handleSizeChange = (size) => {
    // Update the sizeName state to reflect the selected sizes
    const updatedSizeName = sizeName.includes(size)
      ? sizeName.filter((s) => s !== size)  // Remove size if it's already selected
      : [...sizeName, size];                // Add size if it's not selected
  
    setSizeName(updatedSizeName);
  
    // Automatically update the newProduct's sizes
    setNewProduct({
      ...newProduct,
      sizes: ['S', 'M', 'L', 'XL'].map((size) => ({
        name: size,
        available: updatedSizeName.includes(size),  // If the size is selected, available is true, otherwise false
      })),
    });
  };
  

  if (!newProduct.colors) newProduct.colors = [];
  if (!newProduct.sizes) newProduct.sizes = [];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
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
        <input
          type="text"
          placeholder="Category ID"
          value={newProduct.category_id}
          onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.img}
          onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />

        {/* Color Inputs */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Colors</h4>
          <input
            type="text"
            placeholder="Color Name"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Color Image URL"
            value={colorImg}
            onChange={(e) => setColorImg(e.target.value)}
            className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAddColor}
            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            Add Color
          </button>
        </div>

        {/* Displaying added colors */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Added Colors</h4>
          <ul className="flex space-x-8">
            {newProduct.colors.map((color, index) => (
              <li key={index} className="flex items-center mb-2">
                <span className="mr-2">{color.name}</span>
                {color.img && (
                  <img src={color.img} alt={color.name} className="w-6 h-6 rounded-full" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Size Inputs with Checkbox for multiple selection */}
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
            onClick={handleAddProduct}
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
