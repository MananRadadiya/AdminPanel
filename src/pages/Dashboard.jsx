import { useState, useEffect, useMemo } from "react";
import StatCard from "../components/StatCard";
import ThreeDScene from "../components/ThreeDScene";
import { dummyOrders } from "../data/dummyOrders";
import { dummyProducts } from "../data/dummyProducts";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#facc15", "#22c55e", "#ef4444"];

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setOrders(dummyOrders);
    setProducts(dummyProducts);
  }, []);

  const normalizedOrders = useMemo(() => {
    return orders
      .filter(o => o.date && o.amount)
      .map(o => ({
        ...o,
        amount: Number(o.amount),
        date: new Date(o.date).toISOString().slice(0, 10),
      }));
  }, [orders]);

  const totalRevenue = normalizedOrders.reduce(
    (sum, o) => sum + o.amount,
    0
  );

  const pendingOrders = normalizedOrders.filter(
    o => o.status === "Pending"
  ).length;

  const revenueByDate = Object.values(
    normalizedOrders.reduce((acc, o) => {
      acc[o.date] = acc[o.date] || { date: o.date, revenue: 0 };
      acc[o.date].revenue += o.amount;
      return acc;
    }, {})
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const ordersPerProduct = products.map(p => ({
    name: p.name,
    orders: normalizedOrders.filter(
      o => String(o.productId) === String(p.id)
    ).length,
  }));

  const statusData = ["Pending", "Completed", "Cancelled"].map(s => ({
    name: s,
    value: normalizedOrders.filter(o => o.status === s).length,
  }));

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Store performance overview
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={normalizedOrders.length} />
        <StatCard title="Products" value={products.length} />
        <StatCard title="Revenue" value={`₹${totalRevenue.toFixed(2)}`} />
        <StatCard title="Pending Orders" value={pendingOrders} />
      </div>

      {/* 3D Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">3D Visualization</h2>
          <span className="text-xs text-gray-400">Live</span>
        </div>
        <ThreeDScene />
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <ChartBox title="Revenue Over Time" className="xl:col-span-2">
          <LineChart data={revenueByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              strokeWidth={2}
            />
          </LineChart>
        </ChartBox>

        <ChartBox title="Orders per Product">
          <BarChart data={ordersPerProduct}>
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="orders" fill="#000" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartBox>

        <ChartBox title="Revenue Growth" className="xl:col-span-2">
          <AreaChart data={revenueByDate}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#000"
              fill="#000"
              fillOpacity={0.12}
            />
          </AreaChart>
        </ChartBox>

        <ChartBox title="Order Status">
          <PieChart>
            <Pie
              data={statusData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
            >
              {statusData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartBox>
      </div>
    </div>
  );
}

function ChartBox({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <h2 className="font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={260}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
