<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules()
    {
        if (request()->isMethod('post')) {
            return [
                'name' => 'required|string|max:255',
                'image' => 'required',
                'description' => 'required|string',
                'author' => 'required|string',
                'price' => 'required|numeric',
                'quantity' => 'required|numeric',
                'number_of_page' => 'required|numeric',
                'public_date' => 'required',
                'sale_price' => 'nullable|numeric',
                'category_id' => 'required|numeric',
                'brand_id' => 'required|numeric',
            ];
        } else {
            return [
                'name' => 'required|string|max:255',
                'image' => 'nullable',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'quantity' => 'required|numeric',
                'number_of_page' => 'required|numeric',
                'sale_price' => 'nullable|numeric',
                'author' => 'required|string',
                'public_date' => 'required',
                'category_id' => 'required|numeric',
                'brand_id' => 'required|numeric',
            ];
        }
    }
}
