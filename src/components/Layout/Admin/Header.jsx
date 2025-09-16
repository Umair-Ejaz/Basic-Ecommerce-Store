// src/components/admin/Header.jsx

import { useAuth } from "../../../context/AuthContext";


export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        {user && (
          <>
            <span className="text-sm text-gray-700">
              {user.name} ({user.email})
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
