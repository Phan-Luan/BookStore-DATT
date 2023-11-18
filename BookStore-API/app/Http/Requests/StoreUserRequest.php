<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (request()->isMethod('post')) {
            return [
                'name' => 'required|string|max:255',
                'image' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'password' => 'required',
                'phone' => 'required|string',
                'address' => 'required|string',
                'gender' => 'required',
                'role_ids'=>'array'
            ];
        } else {
            return [
                'name' => 'required|string|max:255',
                'image' => 'nullable',
                'email' => [
                    'required',
                    "email",
                    Rule::unique(User::class)->ignore($this->user)
                ],
                'phone' => 'required|string',
                'address' => 'required|string',
                'gender' => 'required',
                'role_ids'=>'array'
            ];
        }
    }
}
