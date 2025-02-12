import { useEffect } from "react";
import { Link } from "react-router-dom";

const API_GATEWAY = import.meta.env.VITE_API_GATEWAY;
const URL_PAYMENT = `${API_GATEWAY}/payment`;

export default function Paid() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (user && cart) {
      const customerId = user.idClient;

      const aggregatedItems = Object.values(
        cart.reduce((acc, item) => {
          if (acc[item.name]) {
            acc[item.name].quantity += 1;
          } else {
            acc[item.name] = { ...item, quantity: 1 };
          }
          return acc;
        }, {})
      );

      const total = aggregatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const currency = "USD";
      const paymentMethod = "card";
      const paymentStatus = "completed";
      const transactionId = `TX${Date.now()}${Math.floor(Math.random() * 1000)}`;
      const paymentDate = new Date().toISOString();

      const paymentData = {
        customerId,
        total,
        currency,
        saleItems: aggregatedItems,
        paymentMethod,
        saleStatus: paymentStatus,
        transactionId,
        saleDate: paymentDate,
      };

      fetch(`${URL_PAYMENT}/save-sale`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment processed:", data);
        })
        .catch((error) => {
          console.error("Error processing payment:", error);
        });
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 to-violet-400">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl overflow-auto">
        <h2 className="text-2xl font-light text-center mb-4 text-gray-800">
          Payment Successful
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Thank you for your purchase! Your payment was processed successfully.
        </p>
        <div className="flex justify-center">
          <Link
            to="/"
            className="bg-pink-300 text-white p-2 rounded-md hover:bg-pink-400 transition duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
