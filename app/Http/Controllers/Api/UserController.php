<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;

use App\Events\ProfileUpdated;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

use Illuminate\Support\Facades\Gate;


use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getByUsername($username)
    {
        $user = User::where('username', $username)->firstOrFail();
        return response()->json($user);
    }

    public function getCurrentUser(Request $request) {
        /**
         * @var User $user
         */
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return response()->json(['user' => $user], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        // /**
        //  * @var User $user
        //  */
        // $user = auth()->user();

        Gate::authorize("update", $user);

        $validated = $request->validated();

        $user->update($validated);

        ProfileUpdated::dispatch($user);

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
