import { useEffect, useState } from "react";
import axios from "axios";

// API URLs for fetching sales, products, and clients
const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;
const productsUrl = `${API_GATEWAY}/product/list`;
const clientsUrl = `${API_GATEWAY}/client`;
const salesUrl = `${API_GATEWAY}/payment`;

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSale, setExpandedSale] = useState(null); // State to manage expanded sale

  // Fetch sales, products, and clients data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get(salesUrl);
        const productsResponse = await axios.post(productsUrl, {
          query: `
            query {
              findAllproducts {
                _id
                name
                price
                category_id
                img
                sizes {
                  name
                  available
                }
              }
            }
          `,
        });
        const clientsResponse = await axios.get(clientsUrl);

        // Ensure the products data is valid and is an array
        setSales(salesResponse.data);
        setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
        setClients(clientsResponse.data);
        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleExpand = (saleId) => {
    if (expandedSale === saleId) {
      setExpandedSale(null); // Collapse if the same sale is clicked
    } else {
      setExpandedSale(saleId); // Expand the selected sale
    }
  };

  if (loading) {
    return <p>Loading sales...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-light mb-4 text-gray-800">Sales Management</h2>

      <div className="space-y-6">
        {sales.map((sale) => (
          <div
            key={sale.sale_id}
            className="flex flex-col border p-5 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all"
          >
            <div
              className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg"
              onClick={() => handleToggleExpand(sale.sale_id)}
            >
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800">
                  {clients.some(client => String(sale.customer_id) === String(client.idClient)) ? (
                    clients.map((client) => (
                      <div key={client.idClient}>
                        {String(sale.customer_id) === String(client.idClient) && (
                          <p className="text-gray-600">{client.givenName} {client.familyName}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Client not found</p> 
                  )}
                </h3>

                <p className="text-gray-600">Total: <span className="font-bold text-lg">${sale.total}</span></p>
                <p className="text-gray-600">Date: {new Date(sale.sale_date).toLocaleDateString()}</p>
              </div>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                {expandedSale === sale.sale_id ? "Collapse" : "Expand"}
              </button>
            </div>

            {expandedSale === sale.sale_id && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Items:</h4>
                <div className="space-y-4">
                  {sale.sale_items.map((item, index) => {
                    const product = products.find((p) => p.name === item.product_name);
                    return (
                      <div key={index} className="flex items-center border-b pb-2 mb-2">
                        <div className="w-16 h-16 mr-4">
                          {/* Display product image */}
                          {product && product.img && (
                            <img src={product.img} alt={item.product_name} className="w-full h-full object-cover rounded-lg" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <strong className="text-gray-800">{item.product_name}</strong>
                          <p className="text-gray-600">Price: ${item.product_price}</p>
                          <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sales;
