// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Umair's Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
