<?php

namespace App\Http\Controllers\Api;

use App\Models\Tweet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    public function index() {
        $tweets = Tweet::orderBy('created_at', 'desc');

        if (request()->has("search")) {
            $tweets = $tweets->where("content", "like", "%" . request("search") . "%");
        }

        return response()->json($tweets->paginate(5));
    }
}
