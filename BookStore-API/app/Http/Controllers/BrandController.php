<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $brand;
    public function __construct(Brand $brand)
    {
        $this->brand = $brand;
    }
    public function index(Request $request)
    {
        $search = $request->get('search');
        $brands = $this->brand->latest('id')->where('name', 'like', '%' . $search . '%')->paginate(5);
        return response()->json($brands);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBrandRequest $request)
    {
        try {
            $data = $request->validated();
            $brand = $this->brand->create($data);

            return response()->json($brand);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => "Something went really wrong!"
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return response()->json($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        return response()->json($brand);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreBrandRequest $request, Brand $brand)
    {
        $data = $request->validated();
        $brand->update($data);
        return response()->json($brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json($brand);
    }
}
