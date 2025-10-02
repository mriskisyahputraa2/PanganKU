<?php

namespace App\Models;

use App\Http\Controllers\CategoryProductController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'hpp',
        'stock',
        'image'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'hpp' => 'decimal:2',
    ];

    /**
     * Get the category that owns the product.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    /**
     * Accessor untuk format price ke Rupiah
     */
    public function getFormattedPriceAttribute(): string
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    /**
     * Accessor untuk format hpp ke Rupiah
     */
    public function getFormattedHppAttribute(): string
    {
        return 'Rp ' . number_format($this->hpp, 0, ',', '.');
    }

    /**
     * Mutator untuk price - hapus format Rupiah sebelum save
     */
    public function setPriceAttribute($value)
    {
        // Jika value berupa string dengan format Rupiah, bersihkan
        if (is_string($value)) {
            $value = preg_replace('/[^0-9]/', '', $value);
        }
        $this->attributes['price'] = $value ?: 0;
    }

    /**
     * Mutator untuk hpp - hapus format Rupiah sebelum save
     */
    public function setHppAttribute($value)
    {
        // Jika value berupa string dengan format Rupiah, bersihkan
        if (is_string($value)) {
            $value = preg_replace('/[^0-9]/', '', $value);
        }
        $this->attributes['hpp'] = $value ?: 0;
    }
}
