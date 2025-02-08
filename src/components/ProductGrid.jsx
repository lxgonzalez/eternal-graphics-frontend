import { useContext } from 'react';
import { ProductContext } from '../service/ProductContext';

const ProductGrid = () => {
  const { products, loading, error } = useContext(ProductContext);

  if (loading) {
    return <p>Cargando productos...</p>;
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
                  onClick={() => console.log(`Producto ${product.name} agregado al carrito`)}
                  className="bg-violet-400 text-white px-4 py-2 rounded-lg hover:bg-violet-500 transition-colors"
                >
                  Agregar al carrito
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
