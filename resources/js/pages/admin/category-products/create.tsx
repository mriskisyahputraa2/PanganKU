import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

// Menerima props 'storeUrl' dan 'indexUrl' dari controller
export default function CreateCategory({ storeUrl, indexUrl }) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Kirim data ke URL yang diberikan oleh props 'storeUrl'
        post(storeUrl);
    };

    return (
        <AppLayout>
            <Head title="Tambah Kategori Produk" />

            <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Tambah Kategori Baru</h1>
                    {/* Tombol Kembali menggunakan URL dari props 'indexUrl' */}
                    <Link
                        href={indexUrl}
                        className="rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Kembali
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                            Nama Kategori
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
                            autoFocus
                        />
                        {/* Tampilkan pesan error jika ada */}
                        {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Kategori'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
