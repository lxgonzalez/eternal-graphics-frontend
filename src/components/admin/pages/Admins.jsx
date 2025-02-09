import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { AdminContext } from "../../../service/AdminContext";  // Cambié el contexto a AdminContext
import EmailModal from "../components/EmailModal";  // Cambié el nombre del componente a EmailModal

const Admins = () => {
  const { emails, error, addEmail, deleteEmail } = useContext(AdminContext);  // Actualizado para emails
  const [newEmail, setNewEmail] = useState('');  // Solo un campo de correo
  const [isModalOpen, setIsModalOpen] = useState(false);  // Estado para controlar el modal de agregar correo

  const handleAddEmail = () => {
    addEmail(newEmail);
    setNewEmail('');  // Limpiar el campo después de agregar
    setIsModalOpen(false);  // Cerrar el modal después de agregar
  };

  const handleDeleteEmail = (idAdmin) => {
    deleteEmail(idAdmin);  // Eliminar correo por id
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-light mb-4 text-gray-800">Admin Emails Management</h2>

      <button
        onClick={() => setIsModalOpen(true)}  // Abrir el modal para agregar correo
        className="bg-blue-300 text-white px-4 py-2 mb-4 rounded flex items-center hover:bg-blue-400 transition duration-200"
      >
        <PlusIcon className="w-5 h-5 mr-2" /> Add Email
      </button>

      {/* Modal para agregar correo */}
      <EmailModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}  // Cerrar modal de agregar
        handleAddEmail={handleAddEmail}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
      />

      <div className="space-y-4">
        {emails.map((email) => (
          <div key={email.adminId} className="flex justify-between items-center border p-4 rounded shadow-md bg-slate-50">
            <div className="flex items-center">
              <h3 className="text-xl font-semibold text-gray-800">{email.email}</h3>
            </div>
            <div className="flex space-x-2">
              
              <button
                onClick={() => handleDeleteEmail(email.adminId)}  // Eliminar correo por id
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

export default Admins;
