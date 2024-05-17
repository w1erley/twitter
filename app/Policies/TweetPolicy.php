<?php

namespace App\Policies;

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TweetPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Tweet $tweet): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Tweet $tweet): bool
    {
        return ($user->is_admin || $user->is($tweet->user));
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Tweet $tweet): bool
    {
        return ($user->is_admin || $user->is($tweet->user));
    }
}
