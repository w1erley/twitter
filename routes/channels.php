<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Broadcast;

use App\Models\User;

Broadcast::channel('user.{id}', function (User $user, int $id) {
    Log::info($user);
    Log::info($id);
    return (int) $user->id === (int) $id;
});
