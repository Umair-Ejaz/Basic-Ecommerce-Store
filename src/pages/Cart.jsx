import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart(){
  const { items, removeFromCart, updateQty, subtotal } = useCart();
  const nav = useNavigate();

  if(items.length === 0) return (
    <div className="text-center py-20">
      <p className="mb-4">Your cart is empty.</p>
      <Link to="/" className="text-blue-600">Continue shopping</Link>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        {items.map(i=>(
          <div key={i.id} className="bg-white p-4 rounded flex items-center">
            <img src={i.image} alt={i.title} className="h-20 w-20 object-contain" />
            <div className="ml-4 flex-1">
              <h3 className="font-semibold">{i.title}</h3>
              <p className="mt-1">${i.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input type="number" min="1" value={i.qty} onChange={(e)=> updateQty(i.id, Math.max(1, Number(e.target.value)))} className="w-20 p-1 border rounded" />
              <button onClick={()=> removeFromCart(i.id)} className="text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="mt-4 flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="mt-4">
          <button onClick={()=> nav("/checkout")} className="w-full bg-green-600 text-white py-2 rounded">Checkout</button>
        </div>
      </div>
    </div>
  );
}
