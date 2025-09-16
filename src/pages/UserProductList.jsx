// src/pages/UserProductList.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useCart } from "../context/CartContext";

export default function UserProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Shop Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No products available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="mt-2 font-semibold text-green-600">
                  ${product.price}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
