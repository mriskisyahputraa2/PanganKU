<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductControllerUser extends Controller
{
    public function index(Request $request)
    {
        // Ambil parameter pencarian dan kategori dari query string
        $search = $request->input('search');
        $category = $request->input('category');

        // Query produk dengan relasi kategori
        $query = Product::with('category');

        // Filter pencarian nama
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        // Filter kategori
        if ($category) {
            $query->where('category_id', $category);
        }

        $products = $query->get();
        $categories = ProductCategory::all();

        return Inertia::render('user/products/userProducts', [
            'products' => $products,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
        ]);
    }
}
