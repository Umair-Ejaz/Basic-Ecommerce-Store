import { Link, NavLink } from "react-router-dom";

import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const { items } = useCart();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const count = items?.reduce((s, i) => s + i.qty, 0);

    const linkClass = ({ isActive }) =>
        `px-3 py-2 rounded hover:bg-gray-200 ${isActive ? "bg-gray-300 font-semibold" : ""
        }`;

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="font-bold text-xl">
                    Umair's Store
                </Link>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    <NavLink to="/products" className={linkClass}>
                        Products
                    </NavLink>
                    <NavLink to="/orders" className={linkClass}>
                        Orders
                    </NavLink>
                    <NavLink to="/users" className={linkClass}>
                        Users
                    </NavLink>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative">
                        <svg
                            className="w-6 h-6 inline"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                            />
                        </svg>
                        {count > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {count}
                            </span>
                        )}
                    </Link>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="focus:outline-none"
                        >
                            <svg
                                className="w-8 h-8 rounded-full bg-gray-200 p-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5.121 17.804A7.5 7.5 0 0112 15.5a7.5 7.5 0 016.879 2.304M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-20">
                                {user ? (
                                    <>
                                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={logout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                                    >
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
