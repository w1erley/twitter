<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class TweetController extends Controller
{

    public function show(Tweet $tweet) {
        return view("tweets.show", compact("tweet"));
    }

    public function edit(Tweet $tweet) {
        Gate::authorize("update", $tweet);

        $editing = true;
        return view("tweets.show", compact("tweet", "editing"));
    }

    public function update(Tweet $tweet) {
        Gate::authorize("update", $tweet);

        $validated = request()->validate([
            "content"=> "required|min:3|max:240",
        ]);

        // $tweet->update(["content" => request()->get("content", "")]);
        // $tweet->content = request()->get("content", "");
        // $tweet->content = request("content");
        // $tweet->save();

        $tweet->update($validated);


        return redirect()->route('tweets.show', $tweet->id)->with('success', 'Tweet was edited succesfully');
    }

    public function store() {
        $validated = request()->validate([
            "content"=> "required|min:3|max:240",
        ]);

        $validated['user_id'] = auth()->id();

        Tweet::create($validated);

        return redirect()->route('dashboard')->with('success', 'Tweet was created succesfully');
    }

    public function destroy(Tweet $tweet) {
        Gate::authorize("delete", $tweet);
        // Tweet::where('id', $id)->firstOrFail()->delete();
        // if (auth()->id() !== $tweet->user_id) {
        //     abort(404, "You cant delete the other persons post");
        // }


        $tweet->delete();
        return redirect()->route('dashboard')->with('success','Tweet was deleted succesfully');
    }

}
