<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Models\Comment;
use Illuminate\Http\Request;

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
        $comment->save();

        return redirect()->route("tweets.show", $tweet->id)->with("success","Comment has been posted successfully");

    }
}
