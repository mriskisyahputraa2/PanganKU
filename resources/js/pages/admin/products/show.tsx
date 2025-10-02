import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const Show = ({ product }) => {
    return (
        <AppLayout>
            <Head title={`Detail ${product.name}`} />

            <div className="p-6">
                <div className="bg-black rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Detail Produk</h2>
                            <Link
                                href="/products"
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Kembali
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Nama Produk
                                    </label>
                                    <p className="text-white text-lg font-semibold">{product.name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Slug
                                    </label>
                                    <p className="text-gray-300">{product.slug}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Kategori
                                    </label>
                                    <p className="text-gray-300">{product.category_name}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Harga
                                    </label>
                                    <p className="text-green-400 text-lg font-bold">{product.formatted_price}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        HPP
                                    </label>
                                    <p className="text-gray-300">{product.formatted_hpp}</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Stok
                                    </label>
                                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {product.stock} unit
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Dibuat Pada
                                    </label>
                                    <p className="text-gray-300">{product.created_at}</p>
                                </div>

                                {product.image && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Gambar Produk
                                        </label>
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {product.description && (
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                    Deskripsi
                                </label>
                                <p className="text-gray-300 bg-gray-800 p-4 rounded">{product.description}</p>
                            </div>
                        )}

                        <div className="mt-6 flex space-x-4">
                            <Link
                                href={`/products/${product.id}/edit`}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Edit Produk
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
