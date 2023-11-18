<?php

namespace App\Http\Requests;

use App\Models\Brand;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBrandRequest extends FormRequest
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
    public function rules(): array
    {
        if (request()->isMethod('post')) {
            return [
                'name' => 'required|string|max:258|unique:brands,name',
                'image' => 'required',
                'description' => 'required|string'
            ];
        } else {
            return [
                'name' => [
                    'required',
                    "string",
                    'max:255',
                    Rule::unique(Brand::class)->ignore($this->brand)
                ],
                'image' => 'nullable',
                'description' => 'required|string'
            ];
        }
    }
}
