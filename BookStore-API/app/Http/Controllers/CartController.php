<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartOrder;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    protected $cart;
    protected $product;

    public function __construct(Cart $cart, Product $product)
    {
        $this->cart = $cart;
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $user_id)
    {
        $carts = $this->cart->where('user_id', $user_id)->with(['products', 'user'])->latest('id')->get();
        return response()->json($carts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dataCreate = $request->all();
        $user_id = $dataCreate['user_id'];
        $product_id = $dataCreate['product_id'];

        $existingCart = $this->cart
            ->where('user_id', $user_id)
            ->where('product_id', $product_id)
            ->first();

        if ($existingCart) {
            $existingCart->increment('quantity', $dataCreate['quantity']);
        } else {
            $this->cart->create($dataCreate);
        }

        return response()->json([
            'message' => 'Tạo thành công'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, Cart $cart)
    {
        if (!$cart) {
            return response()->json(['message' => 'Giỏ hàng không tồn tại.'], 404);
        }

        $newQuantity = $request->input('quantity');

        $cart->quantity = $newQuantity;
        $cart->update();

        return response()->json([
            'cart' => $cart,
            'message' => 'Cập nhật số lượng thành công.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();
        return response()->json(['message' => 'Đã xoá']);
    }

    public function deleteCart($user_id)
    {
        $userCart = $this->cart->where('user_id', $user_id)->first();

        if ($userCart) {
            $userCart->delete();
            return response()->json(['message' => 'Giỏ hàng đã được xóa']);
        } else {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng của user']);
        }
    }

    public function destroyByUserId($user_id)
    {
        $carts = $this->cart->where('user_id', $user_id)->get();

        if ($carts->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng cho người dùng.'], 404);
        }

        $carts->each->delete();

        return response()->json(['message' => 'Xóa toàn bộ giỏ hàng thành công.']);
    }

    public function storeOrder(Request $request)
    {
        $user_id = $request->input('user_id');

        $carts = Cart::where('user_id', $user_id)->get();

        if ($carts->isEmpty()) {
            return response()->json(['message' => 'Không có sản phẩm trong giỏ hàng.'], 400);
        }

        $order = Order::create([
            'status' => 'pending',
            'customer_name' => $request->input('customer_name'),
            'customer_email' => $request->input('customer_email'),
            'customer_phone' => $request->input('customer_phone'),
            'customer_address' => $request->input('customer_address'),
            'payment' => $request->input('payment'),
            'total' => $request->input('total'),
            'user_id' => $user_id,
        ]);

        foreach ($carts as $cart) {
            if ($cart->products->sale_price > 0) {
                $price = $cart->products->sale_price;
            } else {
                $price = $cart->products->price;
            }
            CartOrder::create([
                'order_id' => $order->id,
                'quantity' => $cart->quantity,
                'product_name' => $cart->products->name,
                'product_image' => $cart->products->image,
                'product_price' => $price,
                'product_id' => $cart->products->id,
            ]);
            $product = Product::where('id', $cart->products->id)->first();
            $product->decrement('quantity', $cart->quantity);
        }

        $this->destroyByUserId($user_id);

        return response()->json(['message' => 'Đặt hàng thành công.', "order_id" => $order->id]);
    }
}
