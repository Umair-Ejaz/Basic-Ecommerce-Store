import { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../services/api";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [done, setDone] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeOrder({ ...form, items, total: subtotal });
      setDone(true);
      clearCart();
    } catch {
      alert("Order failed, try again!");
    }
  };

  if (done) return <div className="p-6 text-center">✅ Order placed successfully!</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <input
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <textarea
        placeholder="Address"
        className="w-full p-2 border rounded mb-2"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Place Order (${subtotal.toFixed(2)})
      </button>
    </form>
  );
}
