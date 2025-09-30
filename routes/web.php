<?php
use App\Http\Controllers\ProductController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (){
    return Inertia::render('welcome');
})->name('home');


// Route yang hanya bisa diakses oleh admin
use App\Http\Controllers\CategoryProductController;
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

    // Route untuk halaman product(admin)
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::get('/products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
    Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy');
    // halaman category product
    Route::resource('/category-products', CategoryProductController::class);

});


// Dashboard Route
// Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Products Routes under dashboard
// Route::prefix('admin')->group(function () {
//     Route::get('/products', [ProductController::class, 'index'])->name('dashboard.products.index');
//     Route::get('/products/create', [ProductController::class, 'create'])->name('dashboard.products.create');
//     Route::post('/products', [ProductController::class, 'store'])->name('dashboard.products.store');
//     Route::get('/products/{id}', [ProductController::class, 'show'])->name('dashboard.products.show');
//     Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('dashboard.products.edit');
//     Route::put('/products/{id}', [ProductController::class, 'update'])->name('dashboard.products.update');
//     Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('dashboard.products.destroy');
// });

// // Home route
// Route::get('/', function () {
//     return redirect('/dashboard');
// });

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
