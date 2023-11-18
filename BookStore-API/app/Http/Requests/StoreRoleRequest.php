<?php

namespace App\Http\Requests;

use App\Models\Role;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
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
                'name' => 'required|unique:roles,name',
                'display_name' => 'required',
                'group' => 'required',
            ];
        } else {
            return [
                'name' => [
                    'required',
                    Rule::unique(Role::class)->ignore($this->role)
                ],
                'display_name' => 'required',
                'group' => 'required',
            ];
        }
    }
}
