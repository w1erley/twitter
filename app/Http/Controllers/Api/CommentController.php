<?php

namespace App\Http\Controllers\Api;

use App\Models\Tweet;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Tweet $tweet) {
        request()->validate([
            "content"=> "required|min:3|max:240",
        ]);

        $comment = new Comment();
        $comment->tweet_id = $tweet->id;
        $comment->user_id = auth()->id();
        $comment->content = request("content");
        $comment->load('user');
        $comment->save();

        return response()->json($comment);

    }
}
