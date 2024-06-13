<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Broadcast;

use App\Models\User;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TweetController;
use App\Http\Controllers\Api\ImageController;
use App\Http\Controllers\Api\TweetLikeController;
use App\Http\Controllers\Api\FollowerController;
use App\Http\Controllers\Api\CommentController;

// include __DIR__.'/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('tweets/{tweet}/comments', CommentController::class)->only(['store']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/tweets', [DashboardController::class, 'index']);

    Route::get('tweets/{tweet}', [TweetController::class, 'show']);

    Route::put('/images/upload', [ImageController::class, 'upload']);

    Route::post('/tweets/store', [TweetController::class, 'store']);

    Route::post('tweets/{tweet}/like', [TweetLikeController::class, 'like']);
    Route::post('tweets/{tweet}/unlike', [TweetLikeController::class, 'unlike']);

    Route::post('users/{user}/follow', [FollowerController::class, 'follow']);
    Route::post('users/{user}/unfollow', [FollowerController::class, 'unfollow']);

    Route::get('/users/username/{username}', [UserController::class, 'getByUsername']);
    Route::get('/current-user', [UserController::class, 'getCurrentUser']);

    Route::apiResource('/users', UserController::class)->only(['show', 'update']);
});

// Broadcast::routes(['middleware' => 'auth:sanctum']);

// Route::post('/pusher/auth', 'PusherAuthController@authenticate');

Route::post('/signup', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'authenticate']);
