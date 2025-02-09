import { useState, useContext } from "react";
import { CategoryContext } from "../../../service/CategoryContext";

const UpdateProductModal = ({ isOpen, closeModal, product, handleUpdateProduct, setUpdatedProduct }) => {
  if (!isOpen) return null;

  const { categories, error } = useContext(CategoryContext);

  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [updatedCategoryId, setUpdatedCategoryId] = useState(product.category_id);
  const [updatedImg, setUpdatedImg] = useState(product.img);
  const [updatedSizes, setUpdatedSizes] = useState(product.sizes);

  const [formError, setFormError] = useState('');

  const handleUpdate = () => {
    if (!updatedCategoryId) {
      setFormError("Please select a valid category.");
      return;
    }

    const updatedProduct = {
      ...product,
      name: updatedName,
      price: updatedPrice,
      category_id: updatedCategoryId,
      img: updatedImg,
      sizes: updatedSizes,
    };

    handleUpdateProduct(updatedProduct);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">Update Product</h3>

        {formError && <p className="text-red-500 mb-2">{formError}</p>}

        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          value={updatedPrice}
          onChange={(e) => setUpdatedPrice(parseFloat(e.target.value))}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={updatedCategoryId}
          onChange={(e) => setUpdatedCategoryId(e.target.value)}
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
          value={updatedImg}
          onChange={(e) => setUpdatedImg(e.target.value)}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />

        <div className="mb-2">
          <h4 className="text-sm font-semibold mb-2">Sizes</h4>
          <ul className="flex items-center space-x-10">
            {updatedSizes.map((size, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={size.available}
                  onChange={() => {
                    const updatedSize = [...updatedSizes];
                    updatedSize[index].available = !updatedSize[index].available;
                    setUpdatedSizes(updatedSize);
                  }}
                  className="mr-2"
                />
                <span>{size.name}</span>
              </div>
            ))}
          </ul>
        </div>

        <div className="flex justify-end items-center space-x-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-yellow-300 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductModal;
