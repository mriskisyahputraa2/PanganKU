    import AppLayout from '@/layouts/app-layout';
    import { Head, Link } from '@inertiajs/react';

    export default function Show({ product }) {
        return (
            <AppLayout>
                <Head title={`Product - ${product.name}`} />

                <div className="px-4 py-6 sm:px-0">
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
                                <Link
                                    href={route('products.edit', product.id)}
                                    className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                                >
                                    Edit Product
                                </Link>
                            </div>
                            <p className="text-gray-600 mt-1">{product.slug}</p>
                        </div>

                        {/* Product Image */}
                        {product.image && (
                            <div className="p-6 border-b border-gray-200">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-64 w-full object-cover rounded-lg"
                                />
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Category</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                                {product.category?.name}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Selling Price</dt>
                                        <dd className="mt-1 text-lg font-semibold text-green-600">
                                            Rp {Number(product.price).toLocaleString()}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">HPP (Cost Price)</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            Rp {Number(product.hpp).toLocaleString()}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Profit Margin</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            Rp {Number(product.price - product.hpp).toLocaleString()}
                                            <span className="ml-2 text-green-600">
                                                ({(((product.price - product.hpp) / product.hpp) * 100).toFixed(1)}%)
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-4">Inventory</h3>
                                <dl className="space-y-3">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Stock Available</dt>
                                        <dd className="mt-1">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                product.stock > 10
                                                    ? 'bg-green-100 text-green-800'
                                                    : product.stock > 0
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.stock} units
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Stock Status</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {product.stock > 10
                                                ? 'In Stock'
                                                : product.stock > 0
                                                    ? 'Low Stock'
                                                    : 'Out of Stock'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Potential Revenue</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            Rp {Number(product.stock * product.price).toLocaleString()}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <div>
                                    Created: {new Date(product.created_at).toLocaleDateString()}
                                </div>
                                <div>
                                    Last Updated: {new Date(product.updated_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-6">
                        <Link
                            href={route('products.index')}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </AppLayout>
        );
    }
