<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryProductController extends Controller
{
    public function index()
    {
        // Ambil data dari database
        $categories = ProductCategory::latest()->get()->map(function ($category) {
            // Tambahkan key baru 'urls' ke setiap item kategori
            // yang berisi URL untuk edit dan hapus
            $category->urls = [
                'edit' => route('category-products.edit', $category->id),
                'destroy' => route('category-products.destroy', $category->id),
            ];
            return $category;
        });

        return Inertia::render('admin/category-products/index', [
            'categories' => $categories,
            // Kirim URL untuk tombol "Tambah Kategori"
            'urlCreate' => route('category-products.create'),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/category-products/create', [
            // Kirim URL untuk action form post
            'storeUrl' => route('category-products.store'),
            // Kirim URL untuk tombol "Kembali"
            'indexUrl' => route('category-products.index'),
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories',
        ]);
        $validatedData['slug'] = Str::slug($validatedData['name']);
        ProductCategory::create($validatedData);

        return to_route('category-products.index')->with('success', 'Kategori berhasil ditambahkan!');
    }

    public function edit(ProductCategory $categoryProduct)
    {
        return Inertia::render('admin/category-products/edit', [
            'category' => $categoryProduct,
            // Kirim URL untuk action form update
            'updateUrl' => route('category-products.update', $categoryProduct->id),
            // Kirim URL untuk tombol "Kembali"
            'indexUrl' => route('category-products.index'),
        ]);
    }

    public function update(Request $request, ProductCategory $categoryProduct)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('product_categories')->ignore($categoryProduct->id)],
        ]);
        $validatedData['slug'] = Str::slug($validatedData['name']);
        $categoryProduct->update($validatedData);

        return to_route('category-products.index')->with('success', 'Kategori berhasil diperbarui!');
    }

    public function destroy(ProductCategory $categoryProduct)
    {
        $categoryProduct->delete();
        return to_route('category-products.index')->with('success', 'Kategori berhasil dihapus!');
    }
}
