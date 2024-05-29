<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Tweet;
use App\Models\User;

use App\Http\Controllers\Controller;

class TweetLikeController extends Controller
{
    public function like(Tweet $tweet) {
        /**
         * @var User $liker
         */
        $liker = auth()->user();
        $liker->likes()->attach($tweet->id);

        return response()->json([
            'likesCount' => $tweet->likes_count,
            'isLiked' => $tweet->is_liked
        ]);
    }

    public function unlike(Tweet $tweet) {
        /**
         * @var User $liker
         */
        $liker = auth()->user();
        $liker->likes()->detach($tweet->id);

        return response()->json([
            'likesCount' => $tweet->likes_count,
            'isLiked' => $tweet->is_liked
        ]);
    }

    public function getLikesCount(Tweet $tweet) {
        return response()->json($tweet->likes()->count());
    }
}
