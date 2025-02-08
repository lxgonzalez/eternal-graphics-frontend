import { useState, useEffect } from "react";

const Notification = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), 3000); // Cerrar la notificación después de 3 segundos
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-md ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {message}
    </div>
  );
};

export default Notification;
