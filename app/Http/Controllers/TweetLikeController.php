<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tweet;

class TweetLikeController extends Controller
{
    public function like(Tweet $tweet) {
        $liker = auth()->user();
        $liker->likes()->attach($tweet->id);

        return redirect()->back()->with("success","You have liked the tweet");
    }

    public function unlike(Tweet $tweet) {
        $liker = auth()->user();
        $liker->likes()->detach($tweet->id);

        return redirect()->back()->with("success","You have unliked the tweet");
    }
}
