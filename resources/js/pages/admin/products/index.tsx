import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const Index = ({ products = [] }) => {
    const { props } = usePage();
    const [search, setSearch] = useState('');

    // Ambil flash message (dari Laravel session flash)
    const flashMessage = props.flash?.success;

    // Filter produk berdasarkan search
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    // Konfirmasi hapus
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
            router.delete(`/products/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Products" />

            <div className="p-6">
                {/* Flash Message */}
                {flashMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {flashMessage}
                    </div>
                )}

                {/* Judul + Tombol Tambah */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-white">
                        Daftar Produk
                    </h1>
                    <Link
                        href="/products/create"
                        className="px-4 py-2 bg-white text-black rounded-md border border-gray-300 hover:bg-gray-200 shadow-sm"
                    >
                        + Tambah Produk
                    </Link>
                </div>

                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-48 px-3 py-1 text-sm rounded-md border border-gray-400 bg-white text-black focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Table */}
                <div className="bg-black shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-neutral-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase w-12">
                                        No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Nama Produk
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Harga
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        HPP
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Stok
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Gambar
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-black divide-y divide-gray-700">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <tr key={product.id} className="hover:bg-neutral-900">
                                            <td className="px-6 py-4 text-sm text-gray-300 font-bold">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-100">
                                                    {product.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {product.slug}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {product.category_name}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-semibold text-green-400">
                                                {product.formatted_price}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {product.formatted_hpp}
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        product.stock > 10
                                                            ? 'bg-green-100 text-green-800'
                                                            : product.stock > 0
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image}`}
                                                        alt={product.name}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <span className="text-gray-500">No Image</span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`/products/${product.id}`}
                                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                                                    >
                                                        Lihat
                                                    </Link>
                                                    <Link
                                                        href={`/products/${product.id}/edit`}
                                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(product.id)}
                                                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="px-6 py-4 text-center text-gray-400"
                                        >
                                            Tidak ada produk
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
