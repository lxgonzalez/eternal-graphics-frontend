import { useState } from "react";

const UpdateProductModal = ({ isOpen, closeModal, product, handleUpdateProduct, setUpdatedProduct }) => {
  if (!isOpen) return null;

  const [updatedName, setUpdatedName] = useState(product.name);
  const [updatedPrice, setUpdatedPrice] = useState(product.price);
  const [updatedCategoryId, setUpdatedCategoryId] = useState(product.category_id);
  const [updatedImg, setUpdatedImg] = useState(product.img);
  const [updatedColors, setUpdatedColors] = useState(product.colors);
  const [updatedSizes, setUpdatedSizes] = useState(product.sizes);
  
  // State for new color input
  const [newColorName, setNewColorName] = useState('');
  const [newColorImg, setNewColorImg] = useState('');

  const handleUpdate = () => {
    const updatedProduct = {
      ...product,
      name: updatedName,
      price: updatedPrice,
      category_id: updatedCategoryId,
      img: updatedImg,
      colors: updatedColors,
      sizes: updatedSizes,
    };
    handleUpdateProduct(updatedProduct);
    closeModal();
  };

  const handleAddColor = () => {
    if (newColorName && newColorImg) {
      setUpdatedColors([...updatedColors, { name: newColorName, img: newColorImg }]);
      setNewColorName('');
      setNewColorImg('');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">Update Product</h3>

        {/* Form inputs for product properties */}
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
        <input
          type="text"
          value={updatedCategoryId}
          onChange={(e) => setUpdatedCategoryId(e.target.value)}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          value={updatedImg}
          onChange={(e) => setUpdatedImg(e.target.value)}
          className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
        />

        {/* Color inputs */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Colors</h4>
          {updatedColors.map((color, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={color.name}
                onChange={(e) => {
                  const updatedColor = [...updatedColors];
                  updatedColor[index].name = e.target.value;
                  setUpdatedColors(updatedColor);
                }}
                className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                value={color.img}
                onChange={(e) => {
                  const updatedColor = [...updatedColors];
                  updatedColor[index].img = e.target.value;
                  setUpdatedColors(updatedColor);
                }}
                className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          {/* Add new color */}
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="New Color Name"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="New Color Image URL"
              value={newColorImg}
              onChange={(e) => setNewColorImg(e.target.value)}
              className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
            />
            
          </div>
          <button
              onClick={handleAddColor}
              className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-400"
            >
              Add Color
            </button>
        </div>

        {/* Size inputs */}
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
