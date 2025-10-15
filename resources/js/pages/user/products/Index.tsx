import React from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Cart({ cart, total, flash }) {
  const handleDelete = (id) => {
    Inertia.delete(`/cart/${id}`);
  };

  const handleCheckout = () => {
    Inertia.post("/checkout");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Keranjang Belanja</h1>

      {flash?.success && <p className="text-green-600">{flash.success}</p>}
      {flash?.error && <p className="text-red-600">{flash.error}</p>}

      {Object.keys(cart).length === 0 ? (
        <p>Keranjang masih kosong.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nama Produk</th>
              <th className="p-2 border">Harga</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Subtotal</th>
              <th className="p-2 border">Aksi</th>
            </tr>

          </thead>
          <tbody>
            {Object.entries(cart).map(([id, item]) => (
              <tr key={id}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">Rp {item.price}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">
                  Rp {item.price * item.quantity}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(id)}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Total: Rp {total}</h2>
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
