import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingBag,
  Box,
  Layers,
  User,
  LogOut,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { logoutAdmin } from "../utils/auth";
import { useState } from "react";

export default function Sidebar({
  isOpen,
  setIsOpen,
  role = "admin",
}) {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logoutAdmin();
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", path: "/", icon: LayoutDashboard, roles: ["admin", "staff"] },
    { label: "Orders", path: "/orders", icon: ShoppingBag, roles: ["admin", "staff"] },
    { label: "Products", path: "/products", icon: Box, roles: ["admin"] },
    { label: "Inventory", path: "/inventory", icon: Layers, roles: ["admin"] },
    { label: "Profile", path: "/profile", icon: User, roles: ["admin", "staff"] },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
     ${
       isActive
         ? dark
           ? "bg-white/20 text-white"
           : "bg-black text-white"
         : dark
         ? "text-white/70 hover:bg-white/10"
         : "text-gray-500 hover:bg-gray-100 hover:text-black"
     }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`fixed md:fixed z-50 top-0 left-0 h-screen flex-shrink-0
        ${dark ? "bg-black/60 text-white" : "bg-white text-black"}
        backdrop-blur-xl border-r
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex items-center justify-between px-4 py-5">
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold tracking-tight">
                Admin
              </h1>
              <p className="text-xs opacity-60">
                Management Console
              </p>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-black/5"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>
        </div>

        <nav className="px-2 space-y-1">
          {navItems
            .filter(item => item.roles.includes(role))
            .map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={linkClass}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                {!collapsed && label}
              </NavLink>
            ))}
        </nav>


        <div className="absolute bottom-0 w-full px-2 pb-4 space-y-1">
          <button
            onClick={() => setDark(!dark)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
            text-sm opacity-70 hover:opacity-100 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
            {!collapsed && (dark ? "Light Mode" : "Dark Mode")}
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl
            text-sm text-red-500 hover:bg-red-500/10 transition"
          >
            <LogOut size={18} />
            {!collapsed && "Sign out"}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
