import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import { getProducts } from "../../services/productService";
import { getOrders } from "../../services/orderService";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const normalizeResponse = (res, keys = []) => {
    if (Array.isArray(res)) return res;
    if (res?.data && Array.isArray(res.data)) return res.data;

    // check possible keys (like users, products, orders)
    for (const key of keys) {
      if (res?.[key] && Array.isArray(res[key])) return res[key];
    }

    return [];
  };

  const fetchStats = async () => {
    try {
      const usersRes = await getUsers();
      const productsRes = await getProducts();
      const ordersRes = await getOrders();

      const users = normalizeResponse(usersRes, ["users"]);
      const products = normalizeResponse(productsRes, ["products"]);
      const orders = normalizeResponse(ordersRes, ["orders"]);

      setUserCount(users.length);
      setProductCount(products.length);
      setOrderCount(orders.length);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-3xl font-bold mb-4">{userCount}</p>
          <Link to="/users" className="text-blue-600 hover:underline mt-auto">
            Manage Users &rarr;
          </Link>
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-3xl font-bold mb-4">{productCount}</p>
          <Link to="/products" className="text-blue-600 hover:underline mt-auto">
            Manage Products &rarr;
          </Link>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-3xl font-bold mb-4">{orderCount}</p>
          <Link to="/orders" className="text-blue-600 hover:underline mt-auto">
            Manage Orders &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}