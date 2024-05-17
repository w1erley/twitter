<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class FeedController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = auth()->user();
        $followingIDs = $user->followings()->pluck("user_id");

        $tweets = Tweet::whereIn('user_id', $followingIDs)->latest();

        // if (request()->has("search")) {
        //     $tweets = $tweets->where("content", "like", "%" . request("search") . "%");
        // }

        return view("dashboard",[
            'tweets' => $tweets->paginate(5),
        ]);
    }
}
