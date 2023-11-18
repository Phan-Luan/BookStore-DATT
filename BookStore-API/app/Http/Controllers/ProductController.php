<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $category;
    protected $brand;
    protected $product;
    public function __construct(Category $category, Brand $brand, Product $product)

    {
        $this->category = $category;
        $this->product = $product;
        $this->brand = $brand;
    }
    public function index(Request $request)
    {
        $search = $request->get('search');
        $products = $this->product->with(['brand', 'category'])
            ->where('quantity', '>', 0)
            ->where('name', 'like', '%' . $search . '%')
            ->latest('id')
            ->paginate(5);
        return response()->json($products);
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
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();

        $product = $this->product->create($data);

        return response()->json($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return response()->json($product);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $product->update($data);
        return response()->json($product);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json($product);
    }
}
