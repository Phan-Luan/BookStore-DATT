<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class LoginGoogleController extends Controller
{
    public function login(Request $request)
    {
        try {
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return new UserResource($existingUser);
            } else {
                $newUser = new User();
                $newUser->email = $request->email;
                $newUser->name = $request->name;
                $newUser->password = Hash::make('12345678');
                $newUser->email_verified_at = now();
                $newUser->save();
                $checkUser = User::where('email', $newUser->email)->first();
                return new UserResource($checkUser);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Đăng nhập không thành công'], 501);
        }
    }
}
