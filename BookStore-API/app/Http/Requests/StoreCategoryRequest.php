<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoryRequest extends FormRequest
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
                'name' => 'required|string|max:258|unique:Categories,name',
                'image' => 'required',
            ];
        } else {
            return [
                'name' => [
                    'required',
                    "string",
                    'max:255',
                    Rule::unique(Category::class)->ignore($this->category)
                ],
                'image' => 'nullable',
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            return [
                'name.required' => 'Name is required!',
                'image.required' => 'Image is required!',
            ];
        } else {
            return [
                'name.required' => 'Name is required!',
            ];
        }
    }
}
