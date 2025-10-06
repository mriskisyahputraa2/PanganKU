import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// Menerima props 'categories' dan 'urlCreate' dari controller
export default function CategoryProduct({ categories, urlCreate }) {
    const { props } = usePage();

    // Efek untuk menampilkan notifikasi (flash message) dari controller
    useEffect(() => {
        if (props.flash && props.flash.success) {
            toast.success(props.flash.success);
        }
    }, [props.flash]);

    return (
        <AppLayout>
            <Head title="Kategori Produk" />
            <Toaster position="top-right" /> {/* Komponen untuk render notifikasi */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Daftar Kategori Produk</h1>
                    {/* Tombol Tambah Kategori menggunakan URL dari props */}
                    <Link
                        href={urlCreate}
                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                    >
                        Tambah Kategori
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">No</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Nama Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Slug</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{category.name}</td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{category.slug}</td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            {/* Tombol Edit menggunakan URL dari objek category */}
                                            <Link href={category.urls.edit} className="mr-4 text-indigo-600 hover:text-indigo-900">
                                                Edit
                                            </Link>
                                            {/* Tombol Hapus menggunakan URL dari objek category */}
                                            <Link
                                                href={category.urls.destroy}
                                                method="delete"
                                                as="button"
                                                onBefore={() => confirm('Apakah Anda yakin ingin menghapus kategori ini?')}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        Tidak ada data kategori yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
