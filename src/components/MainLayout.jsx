import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col flex-1 md:ml-64">
        <Navbar setIsOpen={setIsOpen} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pt-20 sm:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
