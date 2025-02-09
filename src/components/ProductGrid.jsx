import { useContext } from 'react';
import { ProductContext } from '../service/ProductContext';
import { ShoppingCartContext } from '../service/ShoppingCartContext';

const ProductGrid = () => {
  const { products, loading, error } = useContext(ProductContext);
  const { addToCart } = useContext(ShoppingCartContext);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <img src={product.img} alt={product.name} className="w-full h-72 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-violet-400">{product.name}</h3>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-400 font-bold">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-pink-300 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition-colors"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
