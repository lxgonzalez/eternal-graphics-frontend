const EmailModal = ({ isOpen, closeModal, handleAddEmail, newEmail, setNewEmail }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-11/12 max-w-lg overflow-y-auto max-h-[90vh]">
          <h3 className="text-xl font-semibold mb-4">Add New Email</h3>
          
          <input
            type="email"
            placeholder="Email Address"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}  // Actualizamos el estado con el nuevo correo
            className="p-2 border rounded mb-2 w-full bg-gray-100 focus:ring-2 focus:ring-blue-400"
          />
  
          <div className="flex justify-end items-center space-x-2">
            <button
              onClick={closeModal}
              className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => handleAddEmail(newEmail)}  // Pasamos el nuevo correo al handler
              className="bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-400"
            >
              Add Email
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EmailModal;
  