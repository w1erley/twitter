<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;

class FollowerController extends Controller
{
    public function follow(User $user) {
        /**
         * @var User $follower
         */
        $follower = auth()->user();

        $follower->followings()->attach($user);

        return response()->json([
            'followers_count' => $user->followers_count,
            'is_followed' => $user->is_followed
        ]);
    }

    public function unfollow(User $user) {
        /**
         * @var User $follower
         */
        $follower = auth()->user();

        $follower->followings()->detach($user);

        return response()->json([
            'followers_count' => $user->followers_count,
            'is_followed' => $user->is_followed
        ]);
    }
}
