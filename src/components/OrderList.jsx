import { useEffect, useState } from "react";
import {
  getOrders,
  deleteOrder,
  createOrder,
  updateOrder,
} from "../services/orderService";
import { getProducts } from "../services/productService";

// Enhanced Modal with better styling
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 p-6 relative animate-fade-in-up">
        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    total: 0,
    items: [],
  });

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleCreate = async () => {
    try {
      const total = form.items.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );

      await createOrder({ ...form, total });
      setIsCreateOpen(false);
      setForm({ name: "", email: "", address: "", total: 0, items: [] });
      loadOrders();
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  const handleEdit = async () => {
    try {
      await updateOrder(selectedOrder.id, form);
      setIsEditOpen(false);
      setSelectedOrder(null);
      loadOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrder(selectedOrder.id);
      setIsDeleteOpen(false);
      setSelectedOrder(null);
      loadOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const toggleItem = (product) => {
    setForm((prev) => {
      const existing = prev.items.find((i) => i.productId === product.id);
      if (existing) {
        // remove
        return { ...prev, items: prev.items.filter((i) => i.productId !== product.id) };
      }
      // add
      return {
        ...prev,
        items: [...prev.items, { productId: product.id, title: product.name, price: product.price, qty: 1 }],
      };
    });
  };

  const updateQty = (productId, qty) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.productId === productId ? { ...i, qty: Number(qty) } : i
      ),
    }));
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setForm(order);
    setIsEditOpen(true);
  };

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Order Management</h2>
            <p className="text-gray-500 mt-1">Manage all customer orders</p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create Order
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="text-xl font-medium text-gray-700 mt-4">No orders yet</h3>
            <p className="text-gray-500 mt-2">Get started by creating your first order</p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Order
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-blue-700">{order.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{order.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">{order.email}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">${order.total}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {order.items?.map((item) => (
                            <span key={item.id} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {item.title} (x{item.qty})
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(order)}
                            className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 rounded-lg p-2 transition-colors duration-200"
                            title="Edit order"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => openDeleteModal(order)}
                            className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 rounded-lg p-2 transition-colors duration-200"
                            title="Delete order"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create New Order"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
              <textarea
                placeholder="123 Main St, City, State, ZIP"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                rows="3"
                required
              />
            </div>

            {/* Product Selection */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Select Products</h3>
              <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto p-1">
                {products.map((p) => {
                  const selected = form.items.find((i) => i.productId === p.id);
                  return (
                    <div
                      key={p.id}
                      className={`border rounded-lg p-3 flex items-center space-x-4 transition-all duration-200 ${
                        selected ? "ring-2 ring-blue-500 border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-14 h-14 object-contain rounded-lg bg-white p-1 border"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-500">${p.price}</p>
                      </div>
                      {selected ? (
                        <div className="flex items-center">
                          <input
                            type="number"
                            value={selected.qty}
                            min="1"
                            onChange={(e) => updateQty(p.id, e.target.value)}
                            className="w-16 border border-gray-300 rounded-lg p-2 text-center"
                          />
                          <button
                            type="button"
                            onClick={() => toggleItem(p)}
                            className="ml-2 text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Remove product"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM9 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleItem(p)}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
              >
                Create Order
              </button>
            </div>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          title="Confirm Deletion"
        >
          <div className="py-4">
            <p className="text-gray-600">Are you sure you want to delete order #{selectedOrder?.id} for {selectedOrder?.name}?</p>
            <p className="text-red-500 font-medium mt-2">This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition-colors"
              >
                Delete Order
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}