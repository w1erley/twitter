<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\UploadImageRequest;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ImageController extends Controller
{
    public function upload(UploadImageRequest $request)
    {
        /**
         * @var User $user
         */
        $user = auth()->user();

        $imageURL = null;

        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $filename = time() . '.' . $image->getClientOriginalExtension();

            // Check if 'profile' folder exists, create it if not
            if (!Storage::disk('public')->exists('profile')) {
                Storage::disk('public')->makeDirectory('profile');
            }

            Image::make($image)->resize(300, 300)->save(public_path('storage/profile/' . $filename), 60);

            $imageURL = 'profile/' . $filename;

            // Delete old image if exists
            Storage::disk('public')->delete($user->image ?? '');
        }

        return response()->json($imageURL);
    }
}
