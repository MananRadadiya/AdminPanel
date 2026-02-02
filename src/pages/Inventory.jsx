import { useState, useEffect } from "react";
import { dummyProducts } from "../data/dummyProducts";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || [];
    if (storedProducts.length === 0) {
      setProducts(dummyProducts);
      localStorage.setItem("products", JSON.stringify(dummyProducts));
    } else {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (e) => {
    e.preventDefault();
    if (!name || !stock) return;

    const newProduct = {
      id: Date.now(),
      name,
      stock: Number(stock),
    };

    setProducts([...products, newProduct]);
    setName("");
    setStock("");
  };

  const updateStock = (id, amount) => {
    const updated = products.map((product) =>
      product.id === id
        ? {
            ...product,
            stock: Math.max(0, product.stock + amount),
          }
        : product
    );
    setProducts(updated);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Inventory
        </h1>
        <p className="text-sm text-gray-500">
          Manage stock levels and products
        </p>
      </div>

      <form
        onSubmit={addProduct}
        className="bg-white p-6 rounded-xl shadow-sm flex flex-col sm:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <input
          type="number"
          placeholder="Initial stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
          Add Product
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">
                Product
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Stock
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Adjust Stock
              </th>
              <th className="px-6 py-3 text-left font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            )}

            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {product.name}
                </td>
                <td className="px-6 py-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() =>
                      updateStock(product.id, 1)
                    }
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded font-medium transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      updateStock(product.id, -1)
                    }
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition"
                  >
                    −
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      deleteProduct(product.id)
                    }
                    className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-600 rounded font-medium transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
