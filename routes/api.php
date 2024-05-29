<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TweetController;
use App\Http\Controllers\Api\TweetLikeController;
use App\Http\Controllers\Api\FollowerController;

// include __DIR__.'/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/tweets', [DashboardController::class, 'index']);

    Route::get('tweets/{tweet}', [TweetController::class, 'show']);

    Route::post('/tweets/store', [TweetController::class, 'store']);

    Route::post('tweets/{tweet}/like', [TweetLikeController::class, 'like']);
    Route::post('tweets/{tweet}/unlike', [TweetLikeController::class, 'unlike']);

    Route::post('users/{user}/follow', [FollowerController::class, 'follow']);
    Route::post('users/{user}/unfollow', [FollowerController::class, 'unfollow']);

    Route::apiResource('/users', UserController::class)->only(['show']);
});

Route::post('/signup', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/test', [AuthController::class, 'test']);
