import { useState, useEffect } from "react";
import { dummyOrders } from "../data/dummyOrders";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

  const updateStatus = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: "Delivered" }
        : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Orders
        </h1>
        <p className="text-sm text-gray-500">
          Manage your orders
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Order ID</th>
              <th className="px-6 py-3 text-left font-semibold">Amount</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  #{order.id}
                </td>
                <td className="px-6 py-4">
                  ₹{order.amount}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {order.status === "Pending" && (
                    <button
                      onClick={() =>
                        updateStatus(order.id)
                      }
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
