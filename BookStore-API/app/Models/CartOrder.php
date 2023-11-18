<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id',
        'quantity',
        'product_name',
        'product_image',
        'product_price',
        'product_id'
    ];
    public function cart()
    {
        return $this->hasMany(Order::class, 'order_id');
    }
}
