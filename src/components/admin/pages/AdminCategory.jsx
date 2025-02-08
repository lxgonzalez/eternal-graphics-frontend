import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { CategoryContext } from "../../../service/CategoryContext";
import CategoryModal from "../components/CategoryModal";
import UpdateCategoryModal from "../components/UpdateCategoryModal";

const AdminCategories = () => {
  const { categories, error, addCategory, updateCategory, deleteCategory } = useContext(CategoryContext);
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [updatedCategory, setUpdatedCategory] = useState(null); // State for updating a category
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the add category modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // State to control the update modal

  const handleAddCategory = () => {
    addCategory(newCategory);
    setNewCategory({ name: '' });
    setIsModalOpen(false); // Close the add category modal after adding
  };

  const handleUpdateCategory = (category) => {
    setUpdatedCategory(category); // Set the category to update
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategory(categoryId);
  };


  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-4 text-gray-800">Admin Categories Management</h2>

      <button
        onClick={() => setIsModalOpen(true)} // Open the add category modal
        className="bg-blue-300 text-white px-4 py-2 mb-4 rounded flex items-center hover:bg-blue-400 transition duration-200"
      >
        <PlusIcon className="w-5 h-5 mr-2" /> Add Category
      </button>

      {/* Add Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)} // Close add category modal
        handleAddCategory={handleAddCategory}
        newCategory={newCategory}
        setNewCategory={setNewCategory}
      />

      {/* Update Category Modal */}
      {updatedCategory && (
        <UpdateCategoryModal
          isOpen={isUpdateModalOpen}
          closeModal={() => setIsUpdateModalOpen(false)} // Close update category modal
          category={updatedCategory}
          handleUpdateCategory={(category) => {
            updateCategory(category); // Handle the category update
            setIsUpdateModalOpen(false);
          }}
          setUpdatedCategory={setUpdatedCategory}
        />
      )}

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.idCategory} className="flex justify-between items-center border p-4 rounded shadow-md bg-slate-50">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdateCategory(category)} // Open the update modal
                className="bg-yellow-300 text-white px-4 py-2 rounded flex items-center hover:bg-yellow-400 transition duration-200"
              >
                <PencilIcon className="w-5 h-5 mr-2" /> Update
              </button>
              <button
                onClick={() => handleDeleteCategory(category.idCategory)}
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

export default AdminCategories;
