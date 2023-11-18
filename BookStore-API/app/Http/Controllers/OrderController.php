<?php

namespace App\Http\Controllers;

use App\Models\CartOrder;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $order;
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
    public function index(User $user)
    {
        $orders = $this->order->where('user_id', $user->id)->get();

        return response()->json($orders);
    }

    public function orderDetail($Order_id)
    {
        $cartItems = CartOrder::where('order_id', $Order_id)->get();
        return response()->json($cartItems);
    }
}
