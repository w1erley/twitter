<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Models\User;
use App\Mail\RegisterEmail;

class AuthController extends Controller
{
    public function register(Request $request) {
        return view("auth.register");
    }

    public function store(User $user) {
        $validated = request()->validate([
            "name" => 'required|min:3|max:20',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|confirmed',
        ]);

        User::create(
            [
                'name'=> $validated['name'],
                'email'=> $validated['email'],
                'password'=> Hash::make($validated['password']),  //can be removed cuz of "casted" below
            ]
        );

        Mail::to($validated['email'])->send(new RegisterEmail($user));

        return redirect()->route('dashboard')->with('success','User has been registered successfully');
    }

    public function login() {
        return view("auth.login");
    }

    public function authenticate() {
        $validated = request()->validate([
            "email" => 'required|email',
            "password" => 'required',
        ]);

        if(auth()->attempt($validated)) {
            request()->session()->regenerate();

            return redirect()->route('dashboard')->with('success','User has been logged in successfully');
        }
        return redirect()->route('login')->withErrors([
            'email'=> 'No mathching user found with the provided email and password'
        ]);

    }

    public function logout() {
        auth()->logout();

        request()->session()->regenerate();
        request()->session()->regenerateToken();

        return redirect()->route('dashboard')->with('success','You have logged out');
    }
}
