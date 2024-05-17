<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FeedController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TweetController;
use App\Http\Controllers\TweetLikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

use Illuminate\Support\Facades\Route;


include __DIR__.'/auth.php';

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

// Route::group(['prefix' => 'tweets/', 'as' => 'tweets.'], function () {

//     // Route::get('/{tweet}', [TweetController::class, 'show'])->name('show');

//     Route::group(['middleware'=>['auth']], function () {
//         // Route::get('/{tweet}/edit', [TweetController::class, 'edit'])->name('edit');

//         // Route::put('/{tweet}/edit', [TweetController::class, 'update'])->name('update');

//         // Route::post('', [TweetController::class, 'store'])->name('store');

//         // Route::delete('/{tweet}', [TweetController::class, 'destroy'])->name('destroy');

//         // Route::post('/{tweet}/comments', [CommentController::class, 'store'])->name('comments.store');
//     });
// });

Route::resource('tweets', TweetController::class)->except(['index', 'create', 'show'])->middleware('auth');
Route::resource('tweets', TweetController::class)->only(['show']);

Route::resource('tweets.comments', CommentController::class)->only(['store'])->middleware('auth');

Route::resource('users', UserController::class)->only(['edit', 'update'])->middleware('auth');
Route::resource('users', UserController::class)->only(['show']);

Route::get('profile', [UserController::class, 'profile'])->middleware('auth')->name('profile');

Route::post('users/{user}/follow', [FollowerController::class, 'follow'])->middleware('auth')->name('users.follow');
Route::post('users/{user}/unfollow', [FollowerController::class, 'unfollow'])->middleware('auth')->name('users.unfollow');

Route::post('tweets/{tweet}/like', [TweetLikeController::class, 'like'])->middleware('auth')->name('tweets.like');
Route::post('tweets/{tweet}/unlike', [TweetLikeController::class, 'unlike'])->middleware('auth')->name('tweets.unlike');

Route::get('/feed', FeedController::class)->name('feed')->middleware('auth');

Route::get('/admin', [AdminDashboardController::class, "index"])->name('admin.dashboard')->middleware('auth', 'can:admin');

Route::get('/terms', function() {
    return view('terms');
})->name('terms');
