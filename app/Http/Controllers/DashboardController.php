<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function index() {
        $tweets = Tweet::orderBy('created_at', 'desc');

        if (request()->has("search")) {
            $tweets = $tweets->where("content", "like", "%" . request("search") . "%");
        }

        return view("dashboard",[
            'tweets' => $tweets->paginate(5),
        ]);
    }
}
