import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar(){
  const { items } = useCart();
  const count = items.reduce((s,i)=> s + i.qty, 0);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Umair's Store</Link>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4"/>
            </svg>
            <span className="ml-1">{count > 0 && <span className="text-sm font-medium">{count}</span>}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
