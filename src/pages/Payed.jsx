import { Link } from "react-router-dom";

export default function Payed() {
    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 to-violet-400">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl overflow-auto">
                <h2 className="text-2xl font-light text-center mb-4 text-gray-800">Payment Successful</h2>
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
        </>
    )
}