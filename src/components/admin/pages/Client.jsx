import { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";

// API URLs for fetching clients
const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;
const clientsUrl = `${API_GATEWAY}/client`;

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch clients data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await axios.get(clientsUrl);
        setClients(clientsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Error loading clients data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-light mb-4 text-gray-800">Clients Management</h2>

      <div className="space-y-6">
        {clients.map((client) => (
          <div
            key={client.idClient}
            className="flex flex-col border p-5 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all"
          >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{client.givenName} {client.familyName}</h3>
                <p className="text-gray-600">Email: {client.email}</p>
                <p className="text-gray-600">Date of Birth: {new Date(client.dob).toLocaleDateString()}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
