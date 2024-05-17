<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;

use App\Models\User;
use App\Mail\RegisterEmail;

class AuthController extends Controller
{
    public function store(SignupRequest $request) {
        $data = $request->validated();

        $user = User::create(
            [
                'username'=> $data['username'],
                'name'=> $data['name'],
                'email'=> $data['email'],
                'password'=> Hash::make($data['password']),  //+sol
            ]
        );

        $token = $user->createToken('main')->plainTextToken;

        // Mail::to($validated['email'])->send(new RegisterEmail($user));

        return response(compact('user', 'token'));
    }

    public function authenticate(LoginRequest $request) {
        $data = $request->validated();
        if(!Auth::attempt($data)) {
            return response([
                'message' => 'The data is incorrect'
            ], 422);
        }

        /**
         * @var User $user
         */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        // Mail::to($validated['email'])->send(new RegisterEmail($user));

        return response(compact('user', 'token'));

    }

    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }

    public function test(Request $request) {
        return(200);
    }
}
