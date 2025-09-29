<?php

use App\Http\Controllers\CategoryProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Role:
// User (pembeli)
// Admin (yang mengatur sistem = category product, product, dll)

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Route::get('/category-product', function () {
//     return Inertia::render('admin.category-products.index');
// });


// Halamanan Khusus Admin
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // halaman category product
    Route::resource('/category-products', CategoryProductController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
