<?php

namespace App\Http\Controllers;

use App\Http\Services\ProductService;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(private ProductService $productService) {}

    /**
     * Display listing of products
     */
    public function index(Request $request)
    {
        $filters = [
            'search' => $request->get('search', ''),
            'category_id' => $request->get('category_id', '')
        ];

        $perPage = $request->get('perPage', 10);

        $products = $this->productService->getProducts($filters, $perPage);
        $categories = $this->productService->getCategories();

        return Inertia::render('admin/products/index', [
            'products' => $products,
            'categories' => $categories['success'] ? $categories['categories'] : [],
            'filters' => $filters,
            'perPage' => (int) $perPage
        ]);
    }

    /**
     * Show form for creating new product
     */
    public function create()
    {
        $categories = $this->productService->getCategories();

        return Inertia::render('admin/products/create', [
            'categories' => $categories['success'] ? $categories['categories'] : []
        ]);
    }

    /**
     * Store new product
     */
    public function store(Request $request)
    {
        $result = $this->productService->createProduct($request->all());

        if ($result['success']) {
            return redirect()->route('admin.products.index')
                ->with('success', $result['message']);
        }

        return back()->with('error', $result['message']);
    }

    /**
     * Display specific product
     */
    public function show(int $id)
    {
        $result = $this->productService->getProduct($id);

        if (!$result['success']) {
            return redirect()->route('admin.products.index')
                ->with('error', $result['message']);
        }

        return Inertia::render('admin/products/show', [
            'product' => $result['product']
        ]);
    }

    /**
     * Show form for editing product
     */
    public function edit(int $id)
    {
        $result = $this->productService->getProduct($id);
        $categories = $this->productService->getCategories();

        if (!$result['success']) {
            return redirect()->route('admin.products.index')
                ->with('error', $result['message']);
        }

        return Inertia::render('admin/products/edit', [
            'product' => $result['product'],
            'categories' => $categories['success'] ? $categories['categories'] : []
        ]);
    }

    /**
     * Update product
     */
    public function update(Request $request, int $id)
    {
        $result = $this->productService->updateProduct($id, $request->all());

        if ($result['success']) {
            return redirect()->route('admin.products.index')
                ->with('success', $result['message']);
        }

        return back()->with('error', $result['message']);
    }

    /**
     * Delete product
     */
    public function destroy(int $id)
    {
        $result = $this->productService->deleteProduct($id);

        if ($result['success']) {
            return redirect()->route('admin.products.index')
                ->with('success', $result['message']);
        }

        return redirect()->route('admin.products.index')
            ->with('error', $result['message']);
    }

    /**
     * API endpoint for getting products
     */
    public function apiIndex(Request $request)
    {
        $filters = [
            'search' => $request->get('search', ''),
            'category_id' => $request->get('category_id', '')
        ];

        $perPage = $request->get('perPage', 10);

        $products = $this->productService->getProducts($filters, $perPage);

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    /**
     * API endpoint for getting single product
     */
    public function apiShow(int $id)
    {
        $result = $this->productService->getProduct($id);

        if (!$result['success']) {
            return response()->json([
                'success' => false,
                'message' => $result['message']
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $result['product']
        ]);
    }
}
