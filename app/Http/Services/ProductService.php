<?php

namespace App\Http\Services;

use App\Http\Repositories\ProductRepository;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;
use Exception;

class ProductService
{
    public function __construct(private ProductRepository $productRepository) {}

    /**
     * Get all products with filtering
     */
    public function getProducts(array $filters = [], int $perPage = 10): LengthAwarePaginator
    {
        try {
            return $this->productRepository->getAll($filters, $perPage);
        } catch (Exception $e) {
            throw new Exception('Failed to retrieve products: ' . $e->getMessage());
        }
    }

    /**
     * Get product by ID
     */
    public function getProduct(int $id): array
    {
        try {
            $product = $this->productRepository->findById($id);

            if (!$product) {
                throw new Exception('Product not found');
            }

            return [
                'success' => true,
                'product' => $product
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Create new product
     */
    public function createProduct(array $data): array
    {
        try {
            // Validate required fields
            $requiredFields = ['name', 'category_id', 'price', 'hpp', 'stock'];
            foreach ($requiredFields as $field) {
                if (empty($data[$field])) {
                    throw new Exception("Field {$field} is required");
                }
            }

            // Validate category exists
            if (!$this->productRepository->categoryExists($data['category_id'])) {
                throw new Exception('Selected category does not exist');
            }

            // Validate numeric fields
            if ($data['price'] <= 0) {
                throw new Exception('Price must be greater than 0');
            }

            if ($data['hpp'] <= 0) {
                throw new Exception('HPP must be greater than 0');
            }

            if ($data['stock'] < 0) {
                throw new Exception('Stock cannot be negative');
            }

            if ($data['price'] <= $data['hpp']) {
                throw new Exception('Selling price must be greater than HPP');
            }

            // Generate unique slug
            $baseSlug = Str::slug($data['name']);
            $slug = $baseSlug;
            $counter = 1;

            // Check if slug already exists
            while ($this->productRepository->findBySlug($slug)) {
                $slug = $baseSlug . '-' . $counter;
                $counter++;
            }

            $data['slug'] = $slug;

            $product = $this->productRepository->create($data);

            return [
                'success' => true,
                'message' => 'Product created successfully',
                'product' => $product
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Update product
     */
    public function updateProduct(int $id, array $data): array
    {
        try {
            // Check if product exists
            if (!$this->productRepository->exists($id)) {
                throw new Exception('Product not found');
            }

            // If category is being updated, validate it exists
            if (isset($data['category_id']) && !$this->productRepository->categoryExists($data['category_id'])) {
                throw new Exception('Selected category does not exist');
            }

            // If name is being updated, generate new slug
            if (isset($data['name'])) {
                $baseSlug = Str::slug($data['name']);
                $slug = $baseSlug;
                $counter = 1;

                // Check if slug already exists (excluding current product)
                while ($existingProduct = $this->productRepository->findBySlug($slug)) {
                    if ($existingProduct->id != $id) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    } else {
                        break;
                    }
                }

                $data['slug'] = $slug;
            }

            // Validate numeric fields if provided
            if (isset($data['price']) && $data['price'] <= 0) {
                throw new Exception('Price must be greater than 0');
            }

            if (isset($data['hpp']) && $data['hpp'] <= 0) {
                throw new Exception('HPP must be greater than 0');
            }

            if (isset($data['stock']) && $data['stock'] < 0) {
                throw new Exception('Stock cannot be negative');
            }

            if (isset($data['price']) && isset($data['hpp']) && $data['price'] <= $data['hpp']) {
                throw new Exception('Selling price must be greater than HPP');
            }

            $updated = $this->productRepository->update($id, $data);

            if (!$updated) {
                throw new Exception('Failed to update product');
            }

            return [
                'success' => true,
                'message' => 'Product updated successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Delete product
     */
    public function deleteProduct(int $id): array
    {
        try {
            // Check if product exists
            if (!$this->productRepository->exists($id)) {
                throw new Exception('Product not found');
            }

            $deleted = $this->productRepository->delete($id);

            if (!$deleted) {
                throw new Exception('Failed to delete product');
            }

            return [
                'success' => true,
                'message' => 'Product deleted successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Get product categories
     */
    public function getCategories(): array
    {
        try {
            $categories = $this->productRepository->getCategories();

            return [
                'success' => true,
                'categories' => $categories
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Update product stock
     */
    public function updateStock(int $id, int $quantity): array
    {
        try {
            if ($quantity < 0) {
                throw new Exception('Stock cannot be negative');
            }

            $updated = $this->productRepository->updateStock($id, $quantity);

            if (!$updated) {
                throw new Exception('Failed to update stock');
            }

            return [
                'success' => true,
                'message' => 'Stock updated successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    /**
     * Get low stock products
     */
    public function getLowStockProducts(int $threshold = 10): array
    {
        try {
            $products = $this->productRepository->getLowStock($threshold);

            return [
                'success' => true,
                'products' => $products,
                'count' => $products->count()
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }
}
//require __DIR__.'/auth.php';
//require __DIR__.'/settings.php';
