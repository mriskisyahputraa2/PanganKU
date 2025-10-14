import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";

export default function UserProducts() {
  const { products: initialProducts, auth, cart: initialCart = [] } = usePage().props;

  const [products, setProducts] = useState(initialProducts || []);
  const [selectedQty, setSelectedQty] = useState({});
  const [cart, setCart] = useState(initialCart || []);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState({
    product: null,
    qty: 1,
    address: auth?.address || "",
    pickupTime: "",
  });

  // ✅ Ganti axios -> inertia router.post
  const handleAddToCart = (product) => {
    const qty = selectedQty[product.id] || 1;
    router.post(
      "/cart",
      { product_id: product.id, qty },
      {
        preserveScroll: true,
        onSuccess: (page) => {
          alert("Produk ditambahkan ke keranjang!");
          if (page.props.cart) setCart(page.props.cart);
        },
        onError: () => alert("Gagal menambahkan ke keranjang"),
      }
    );
  };

  const handleQtyChange = (id, value) => {
    if (value < 1 || isNaN(value)) value = 1;
    setSelectedQty((prev) => ({ ...prev, [id]: value }));
  };

  const handleBuyNow = (product) => {
    const qty = selectedQty[product.id] || 1;
    setOrderData({
      product,
      qty,
      address: auth?.address || "",
      pickupTime: "",
    });
    setShowModal(true);
  };

  // ✅ Ganti axios -> inertia router.post
  const handleConfirmOrder = () => {
    if (!orderData.address || !orderData.pickupTime) {
      alert("Lengkapi alamat dan waktu pengambilan!");
      return;
    }

    router.post(
      "/checkout",
      {
        address: orderData.address,
        pickup_time: orderData.pickupTime,
      },
      {
        onSuccess: () => {
          alert("Order berhasil dibuat!");
          setShowModal(false);
        },
        onError: () => alert("Gagal checkout"),
      }
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head title="Produk Pangan Segar" />
      <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-10">
          🥬 Daftar Produk Pangan Segar
        </h1>

        {/* 🔍 Pencarian */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-green-400 rounded-full px-5 py-2 w-full sm:w-1/2 focus:ring-2 focus:ring-green-500 focus:outline-none shadow-md text-gray-700"
          />
        </div>

        {/* 🛒 Keranjang */}
        {cart.length > 0 && (
          <div className="max-w-3xl mx-auto mb-8 bg-white rounded-xl shadow-md p-4 border border-green-200">
            <h2 className="font-semibold text-green-700 text-lg mb-3">
              🛒 Keranjang Belanja ({cart.length} item)
            </h2>
            <ul className="divide-y divide-gray-200 text-gray-700">
              {cart.map((item, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.qty} kg — HPP: Rp{" "}
                      {(item.qty * item.product.hpp).toLocaleString("id-ID")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 📦 Produk */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-transform hover:scale-105"
              >
                <img
                  src={
                    product.image
                      ? `/storage/${product.image}`
                      : "/images/default.jpg"
                  }
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>

                  <p className="text-green-600 font-bold mt-1">
                    HPP: Rp {product.hpp.toLocaleString("id-ID")} / kg
                  </p>

                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p>
                      📦 Stok:{" "}
                      <span className="font-semibold">{product.stock} kg</span>
                    </p>
                    <p>
                      🏠 Kategori: {product.category?.name || "Belum tersedia"}
                    </p>
                    <p>
                      📋 Deskripsi:{" "}
                      {product.description || "Tidak ada deskripsi."}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <label className="text-sm text-gray-700">Jumlah (kg):</label>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={selectedQty[product.id] || 1}
                      onChange={(e) =>
                        handleQtyChange(
                          product.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="border border-green-300 rounded-md px-2 py-1 w-20 focus:ring-2 focus:ring-green-400 text-gray-700"
                    />
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full transition"
                    >
                      Beli Sekarang
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-full transition"
                    >
                      🛒 Tambah ke Keranjang
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              Produk tidak ditemukan.
            </div>
          )}
        </div>

        {/* 🧾 Modal Checkout */}
        {showModal && orderData.product && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
                Konfirmasi Pesanan
              </h2>
              <p className="font-semibold mb-2">{orderData.product.name}</p>
              <p>Jumlah: {orderData.qty} kg</p>
              <p className="text-green-600 font-semibold mb-3">
                Total HPP: Rp{" "}
                {(orderData.qty * orderData.product.hpp).toLocaleString("id-ID")}
              </p>

              <label className="block text-sm font-medium text-gray-700 mt-2">
                Alamat Pengiriman:
              </label>
              <input
                type="text"
                value={orderData.address}
                onChange={(e) =>
                  setOrderData({ ...orderData, address: e.target.value })
                }
                placeholder="Masukkan alamat lengkap"
                className="w-full border rounded-md px-3 py-2 mt-1 text-gray-700"
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">
                Waktu Ambil:
              </label>
              <input
                type="time"
                value={orderData.pickupTime}
                onChange={(e) =>
                  setOrderData({ ...orderData, pickupTime: e.target.value })
                }
                className="w-full border rounded-md px-3 py-2 mt-1 text-gray-700"
              />

              <div className="flex justify-end gap-2 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-gray-700"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  Konfirmasi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
