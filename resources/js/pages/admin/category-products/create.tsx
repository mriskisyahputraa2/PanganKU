import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/category-products');
    };

    return (
        <AppLayout>
            <Head title="Tambah Kategori Produk" />

            {/* Wrapper hitam + posisi tengah */}
            <div className="flex justify-center bg-black py-10">
                <div className="w-full max-w-md bg-neutral-900 rounded-lg shadow-lg p-6">

                    {/* Judul */}
                    <h1 className="text-xl font-bold text-white mb-4">
                        Tambah Kategori Baru
                    </h1>

                    {/* Form */}
                    <form onSubmit={submit}>
                        {/* Input Nama */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nama Kategori
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-neutral-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Tombol Aksi */}
                        <div className="flex justify-between">
                            <Link
                                href="/category-products"
                                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                            >
                                Kembali
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                                Simpan Kategori
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
