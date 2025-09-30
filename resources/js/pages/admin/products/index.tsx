// resources/js/Pages/Products/Index.jsx
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products = [] }) {
  return (
    <AppLayout>
      <Head title="Products" />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Daftar Produk
        </h1>

 <Link
  href="/products/create"
  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-00"
>
  + Tambah Produk
</Link>


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
                    Nama Kategori
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
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product.id} className="hover:bg-neutral-900">
                      {/* NOMOR URUT */}
                      <td className="px-6 py-4 text-sm text-gray-300 font-bold">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-gray-100">
                        {product.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-300">
                        {product.category?.name ?? '-'}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-300">
                        {product.image ? (
                          <img
                            src={product.image}
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
                            href={route('products.edit', product.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route('products.destroy', product.id)}
                            method="delete"
                            as="button"
                            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Hapus
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
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
}
