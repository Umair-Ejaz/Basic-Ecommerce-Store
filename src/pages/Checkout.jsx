import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout(){
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // no backend: simulate order placed
    setDone(true);
    clearCart();
  };

  if(items.length === 0 && !done) return <div className="text-center py-20">Your cart is empty. <br/></div>;

  if(done) return <div className="text-center py-20"><h2 className="text-2xl font-bold">Thank you — order placed!</h2></div>;

  return (
    <div className="max-w-2xl mx-auto grid gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Shipping & Billing</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name" className="w-full p-2 border rounded" />
          <input required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="w-full p-2 border rounded" />
          <textarea required value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Address" className="w-full p-2 border rounded" />
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total: ${subtotal.toFixed(2)}</span>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Place order</button>
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-semibold">Items</h4>
        <ul className="mt-3 space-y-2">
          {items.map(i=> <li key={i.id} className="flex justify-between">{i.title} <span>${(i.price*i.qty).toFixed(2)}</span></li>)}
        </ul>
      </div>
    </div>
  );
}
