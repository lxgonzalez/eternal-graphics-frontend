import { useContext, useState } from 'react';
import { ShoppingCartContext } from '../service/ShoppingCartContext';
import { TrashIcon } from '@heroicons/react/16/solid';

// const URL_API = import.meta.env.VITE_API_GATEWAY;
const URL_API = import.meta.env.VITE_API_DEV;
const paymentUrl = `${URL_API}/create-order`;

const ShoppingCart = () => {
    const { cart, removeFromCart } = useContext(ShoppingCartContext);
    const [isLoading, setIsLoading] = useState(false);
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const user = localStorage.getItem('user');

    const handleCheckout = async () => {
        if (!user) {
            window.location.href = '/login';
            return;
        }
        setIsLoading(true);
        const orderData = {
            amount: subtotal,
            products: cart.map(item => ({ id: item.idProduct, price: item.price }))
        };

        try {
            const response = await fetch(paymentUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData), 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            window.location.href = data.links[1].href;
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>The cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li
                                key={index}
                                className="mb-4 flex justify-between items-center border-b pb-2"
                            >
                                <img src={item.img} alt={item.name} className="w-10 h-10 object-cover mr-4" />
                                <div>
                                    <span className="font-bold">{item.name}</span> - ${item.price.toFixed(2)}
                                </div>
                                <button
                                    onClick={() => removeFromCart(index)}
                                    className="bg-red-300 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition-colors"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-right">
                        <p className="text-lg font-semibold">
                            Subtotal: <span className="text-green-600">${subtotal.toFixed(2)}</span>
                        </p>
                        <div className='flex items-center justify-end gap-6 mt-4'>
                            {
                                isLoading && (
                                    <div className="text-center">
                                        <div className="loader border-t-2 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                                    </div>
                                )
                            }
                            <div>
                                <button
                                    onClick={handleCheckout}
                                    className="bg-violet-400 text-white px-6 py-2 rounded-lg hover:bg-violet-500 transition-colors"
                                >
                                    Go to Checkout
                                </button>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;
