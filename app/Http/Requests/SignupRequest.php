<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use function PHPSTORM_META\map;

class SignupRequest extends FormRequest
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
        return [
            "username" => 'required|min:3|max:20|unique:users,username',
            "name" => 'required|min:3|max:40',
            "email" => 'required|email',
            "password" => [
                'required',
                'confirmed',
                // Password::min(8)
                //     ->letters()
                //     ->symbols()
            ]
        ];
    }
}
