import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow">
      <img src={product.image} alt={product.title} className="h-40 mx-auto object-contain" />
      <h3 className="mt-3 font-semibold text-sm">{product.title}</h3>
      <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
      <div className="flex items-center justify-between mt-3">
        <Link to={`/product/${product.id}`} className="text-blue-600 text-sm">View</Link>
        <button onClick={()=> addToCart(product,1)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add</button>
      </div>
    </div>
  );
}
