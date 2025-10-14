<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    // 🔹 Tampilkan isi keranjang
    public function index(Request $request)
    {
        $cart = Session::get('cart', []);

        $cartWithProducts = collect($cart)->map(function ($item) {
            $product = Product::find($item['product_id']);
            return [
                'id' => $item['id'],
                'product_id' => $item['product_id'],
                'qty' => $item['qty'],
                'product' => $product,
            ];
        })->values()->toArray();

        return Inertia::render('user/products/cart', [
            'cart' => $cartWithProducts,
        ]);
    }

    // 🔹 Tambah ke keranjang
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'qty' => 'required|integer|min:1',
        ]);

        $productId = (int) $request->product_id;
        $qty = (int) $request->qty;

        $cart = Session::get('cart', []);
        $foundKey = null;

        foreach ($cart as $k => $item) {
            if ($item['product_id'] == $productId) {
                $foundKey = $k;
                break;
            }
        }

        if ($foundKey !== null) {
            $cart[$foundKey]['qty'] += $qty;
        } else {
            $cart[] = [
                'id' => uniqid(),
                'product_id' => $productId,
                'qty' => $qty,
            ];
        }

        Session::put('cart', $cart);

        return back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
    }

    // 🔹 Hapus item dari keranjang
    public function destroy($id)
    {
        $cart = Session::get('cart', []);
        $cart = collect($cart)->reject(fn($item) => $item['id'] == $id)->values()->toArray();
        Session::put('cart', $cart);

        return back()->with('success', 'Produk dihapus dari keranjang.');
    }

    // 💳 Checkout (tanpa database)
    public function checkout(Request $request)
    {
        $cart = Session::get('cart', []);

        if (empty($cart)) {
            return back()->with('error', 'Keranjang kamu kosong!');
        }

        // Bisa tambahkan validasi alamat di sini jika mau
        Session::forget('cart'); // Kosongkan keranjang

        return back()->with('success', 'Checkout berhasil! Pesananmu sedang diproses.');
    }
}
