<?php

namespace App\Http\Repositories;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository
{
    public function __construct(
        private Product $product,
        private ProductCategory $category
    ) {}

    /**
     * Get all products with pagination
     */
    public function getAll(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        $query = $this->product->with('category');

        if (!empty($filters['search'])) {
            $query->where(function($q) use ($filters) {
                $q->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('description', 'like', '%' . $filters['search'] . '%');
            });
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        return $query->orderBy('created_at', 'desc')->paginate($perPage);
    }

    /**
     * Get product by ID
     */
    public function findById(int $id): ?Product
    {
        return $this->product->with('category')->find($id);
    }

    /**
     * Get product by slug
     */
    public function findBySlug(string $slug): ?Product
    {
        return $this->product->with('category')->where('slug', $slug)->first();
    }

    /**
     * Create new product
     */
    public function create(array $data): Product
    {
        return $this->product->create($data);
    }

    /**
     * Update product
     */
    public function update(int $id, array $data): bool
    {
        $product = $this->findById($id);

        if (!$product) {
            return false;
        }

        return $product->update($data);
    }

    /**
     * Delete product
     */
    public function delete(int $id): bool
    {
        $product = $this->findById($id);

        if (!$product) {
            return false;
        }

        return $product->delete();
    }

    /**
     * Update product stock
     */
    public function updateStock(int $id, int $quantity): bool
    {
        $product = $this->findById($id);

        if (!$product) {
            return false;
        }

        return $product->update(['stock' => $quantity]);
    }

    /**
     * Get all categories
     */
    public function getCategories(): Collection
    {
        return $this->category->orderBy('name')->get();
    }

    /**
     * Check if product exists
     */
    public function exists(int $id): bool
    {
        return $this->product->where('id', $id)->exists();
    }

    /**
     * Check if category exists
     */
    public function categoryExists(int $categoryId): bool
    {
        return $this->category->where('id', $categoryId)->exists();
    }

    /**
     * Get products with low stock
     */
    public function getLowStock(int $threshold = 10): Collection
    {
        return $this->product->where('stock', '<=', $threshold)->get();
    }
}
