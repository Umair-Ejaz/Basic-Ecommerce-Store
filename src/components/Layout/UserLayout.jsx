// src/layouts/UserLayout.jsx
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
