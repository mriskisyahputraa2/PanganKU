import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const Edit = ({ product, categories }) => {
    const { data, setData, put, processing, errors } = useForm({
        category_id: product.category_id || '',
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        hpp: product.hpp || '',
        stock: product.stock || '',
        image: null,
    });

    const [priceDisplay, setPriceDisplay] = useState('');
    const [hppDisplay, setHppDisplay] = useState('');

    useEffect(() => {
        // Format initial values to Rupiah
        if (product.price) {
            setPriceDisplay('Rp ' + parseInt(product.price).toLocaleString('id-ID'));
        }
        if (product.hpp) {
            setHppDisplay('Rp ' + parseInt(product.hpp).toLocaleString('id-ID'));
        }
    }, [product]);

    const formatRupiah = (value) => {
        const number = value.replace(/\D/g, '');
        return number ? 'Rp ' + parseInt(number).toLocaleString('id-ID') : '';
    };

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceDisplay(formatRupiah(value));

        const numericValue = value.replace(/\D/g, '');
        setData('price', numericValue || 0);
    };

    const handleHppChange = (e) => {
        const value = e.target.value;
        setHppDisplay(formatRupiah(value));

        const numericValue = value.replace(/\D/g, '');
        setData('hpp', numericValue || 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Product" />

            <div className="p-6">
                <div className="bg-black rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Edit Produk</h2>

                        {product.image && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Gambar Saat Ini
                                </label>
                                <img
                                    src={`/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-32 h-32 object-cover rounded border"
                                />
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Kategori *
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="" className="text-gray-500">Pilih Kategori</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id} className="text-white">
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="text-red-400 text-sm mt-1">{errors.category_id}</p>
                                    )}
                                </div>

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Nama Produk *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Harga *
                                    </label>
                                    <input
                                        type="text"
                                        value={priceDisplay}
                                        onChange={handlePriceChange}
                                        placeholder="Rp 0"
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.price && (
                                        <p className="text-red-400 text-sm mt-1">{errors.price}</p>
                                    )}
                                </div>

                                {/* HPP */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        HPP (Harga Pokok Penjualan) *
                                    </label>
                                    <input
                                        type="text"
                                        value={hppDisplay}
                                        onChange={handleHppChange}
                                        placeholder="Rp 0"
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.hpp && (
                                        <p className="text-red-400 text-sm mt-1">{errors.hpp}</p>
                                    )}
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Stok *
                                    </label>
                                    <input
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        min="0"
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.stock && (
                                        <p className="text-red-400 text-sm mt-1">{errors.stock}</p>
                                    )}
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Gambar Baru (Kosongkan jika tidak ingin mengubah)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 file:bg-gray-700 file:border-0 file:text-white file:mr-4 file:py-2 file:px-4"
                                    />
                                    {errors.image && (
                                        <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows="4"
                                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                />
                                {errors.description && (
                                    <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <a
                                    href="/products"
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Batal
                                </a>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                >
                                    {processing ? 'Mengupdate...' : 'Update Produk'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
