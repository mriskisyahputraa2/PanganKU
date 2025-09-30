import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ product = null, categories }) {
    const { data, setData, errors, processing, post, put } = useForm({
        name: product?.name || '',
        category_id: product?.category_id || '',
        description: product?.description || '',
        price: product?.price || '',
        hpp: product?.hpp || '',
        stock: product?.stock || 0,
        image: null // sekarang file bukan URL
    });

    const isEdit = !!product;

    const submit = (e) => {
        e.preventDefault();

        // kirim multipart data
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category_id', data.category_id);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('hpp', data.hpp);
        formData.append('stock', data.stock);
        if (data.image) {
            formData.append('image', data.image);
        }

        if (isEdit) {
            put(`/products/${product.id}`, formData);
        } else {
            post('/products', formData);
        }
    };

    return (
        <AppLayout header={isEdit ? 'Edit Product' : 'Create New Product'}>
            <Head title={isEdit ? 'Edit Product' : 'Create Product'} />

            <div className="px-4 py-6 sm:px-0">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={submit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg" encType="multipart/form-data">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category_id" className="block text-sm font-semibold text-gray-800">
                                Category *
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                        </div>

                        {/* Price & HPP */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block text-sm font-semibold text-gray-800">
                                    Selling Price (Rp) *
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={e => setData('price', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>
                            <div>
                                <label htmlFor="hpp" className="block text-sm font-semibold text-gray-800">
                                    HPP (Cost Price) (Rp) *
                                </label>
                                <input
                                    type="number"
                                    id="hpp"
                                    step="0.01"
                                    min="0"
                                    value={data.hpp}
                                    onChange={e => setData('hpp', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                    required
                                />
                                {errors.hpp && <p className="mt-1 text-sm text-red-600">{errors.hpp}</p>}
                            </div>
                        </div>

                        {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-semibold text-gray-800">
                                Stock Quantity *
                            </label>
                            <input
                                type="number"
                                id="stock"
                                min="0"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                required
                            />
                            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Image File */}
                        <div>
                            <label htmlFor="image" className="block text-sm font-semibold text-gray-800">
                                Upload Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={e => setData('image', e.target.files[0])}
                                className="mt-1 block w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                            />
                            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                            <Link
                                href="/products"
                                className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-emerald-600 text-white px-5 py-2 rounded-md hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : (isEdit ? 'Update Product' : 'Create Product')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
