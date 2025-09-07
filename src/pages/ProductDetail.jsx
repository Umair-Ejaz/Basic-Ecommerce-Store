import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetail(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const nav = useNavigate();

  useEffect(()=> { fetchProduct(id).then(setProduct).catch(()=>{}); }, [id]);

  if(!product) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded shadow md:flex md:space-x-6">
      <img src={product.image} alt={product.title} className="h-64 w-full md:w-1/3 object-contain" />
      <div className="mt-4 md:mt-0 md:flex-1">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-2xl font-bold mt-4">${product.price.toFixed(2)}</p>
        <div className="mt-4 flex items-center space-x-2">
          <input type="number" min="1" value={qty} onChange={(e)=>setQty(Math.max(1, Number(e.target.value)))} className="w-20 p-2 border rounded" />
          <button onClick={()=> { addToCart(product, qty); nav("/cart"); }} className="bg-blue-600 text-white px-4 py-2 rounded">Add to cart</button>
        </div>
      </div>
    </div>
  );
}
