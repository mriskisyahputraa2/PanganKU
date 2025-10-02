import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const CategoryProduct = ({ categories = [], urlCreate }) => {
    const { props } = usePage();
    const [search, setSearch] = useState('');

    // Ambil flash message (dari Laravel session flash)
    const flashMessage = props.flash?.success;

    // Filter kategori berdasarkan search
    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.slug.toLowerCase().includes(search.toLowerCase())
    );

    // Konfirmasi hapus
    const handleDelete = (url) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
            router.delete(url);
        }
    };

    return (
        <AppLayout>
            <Head title="Kategori Produk" />

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
                        Daftar Kategori Produk
                    </h1>
                    <Link
                        href={urlCreate}
                        className="px-4 py-2 bg-white text-black rounded-md border border-gray-300 hover:bg-gray-200 shadow-sm"
                    >
                        + Tambah Kategori
                    </Link>
                </div>

                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Cari kategori..."
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
                                        Nama Kategori
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Slug
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Jumlah Produk
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Dibuat Pada
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-black divide-y divide-gray-700">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category, index) => (
                                        <tr key={category.id} className="hover:bg-neutral-900">
                                            <td className="px-6 py-4 text-sm text-gray-300 font-bold">
                                                {index + 1}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-100">
                                                    {category.name}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {category.slug}
                                            </td>

                                            <td className="px-6 py-4 text-sm">
                                                <span className="inline-flex px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                                                    {category.products_count || 0} produk
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {new Date(category.created_at).toLocaleDateString('id-ID')}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-300">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={category.urls?.edit || `/categories/${category.id}/edit`}
                                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-xs"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(category.urls?.destroy || `/categories/${category.id}`)}
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
                                            colSpan={6}
                                            className="px-6 py-4 text-center text-gray-400"
                                        >
                                            {search ? 'Tidak ada kategori yang sesuai dengan pencarian' : 'Tidak ada kategori'}
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

export default CategoryProduct;
