import React from "react";
import { usePage, router } from "@inertiajs/react";

export default function Cart() {
  const { cart, flash } = usePage().props;

  const handleDelete = (id) => {
    router.delete(`/cart/${id}`);
  };

  const handleCheckout = () => {
    router.post("/checkout");
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="p-10 text-center text-gray-500">
        Keranjang kamu masih kosong 😢
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.product?.price || 0) * item.qty,
    0
  );

  return (
       <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-10">
          🥬 Daftar Produk Pangan Segar
        </h1>
          <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Keranjang Belanja</h1>

      {flash?.success && (
        <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">
          {flash.success}
        </div>
      )}
      {flash?.error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {flash.error}
        </div>
      )}

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Nama Produk</th>
            <th className="p-2 border">Harga</th>
            <th className="p-2 border">Jumlah</th>
            <th className="p-2 border">Subtotal</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.product?.name}</td>
              <td className="p-2 border">
                Rp {parseFloat(item.product?.price || 0).toLocaleString()}
              </td>
              <td className="p-2 border">{item.qty}</td>
              <td className="p-2 border">
                Rp{" "}
                {(parseFloat(item.product?.price || 0) * item.qty).toLocaleString()}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right mt-4 font-semibold">
        Total: Rp {total.toLocaleString()}
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
        </div>

  );
}
