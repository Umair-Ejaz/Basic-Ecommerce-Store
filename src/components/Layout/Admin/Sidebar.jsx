// src/components/admin/Sidebar.jsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-200 ${
      isActive ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}
