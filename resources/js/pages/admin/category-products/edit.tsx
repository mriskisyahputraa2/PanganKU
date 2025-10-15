import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const EditCategory = ({ category }) => {
    const { data, setData, errors, put, processing } = useForm({
        name: category.name || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.categories.update', category.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit Kategori: ${category.name}`} />

            <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Edit Kategori</h1>
                        <p className="text-gray-400 mt-1">ID: {category.id} - {category.slug}</p>
                    </div>
                    <Link
                        href={route('dashboard.categories.index')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        Kembali
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-black p-6 rounded-lg shadow">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nama Kategori *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                placeholder="Masukkan nama kategori"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                        </div>

                        {/* Info Slug */}
                        <div className="bg-gray-800 p-4 rounded-md">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Informasi Slug</h3>
                            <p className="text-sm text-gray-400">
                                Slug akan otomatis di-generate dari nama kategori:
                                <span className="text-emerald-400 ml-1 font-mono">
                                    {data.name ? data.name.toLowerCase().replace(/\s+/g, '-') : '...'}
                                </span>
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Perbarui Kategori'}
                            </button>
                            <Link
                                href={route('dashboard.categories.index')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                Batal
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Current Category Info */}
                <div className="mt-6 bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-3">Informasi Kategori Saat Ini</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-400">ID Kategori</p>
                            <p className="text-white font-mono">{category.id}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Slug Saat Ini</p>
                            <p className="text-white font-mono">{category.slug}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">Nama Saat Ini</p>
                            <p className="text-white">{category.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default EditCategory;
