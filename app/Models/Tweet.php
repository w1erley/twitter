<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    use HasFactory;

    protected $with = ["user:id,name,image,username", "comments.user:id,name,image,username"];

    protected $fillable = [
        'content',
        'user_id',
    ];

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function likes() {
        return $this->belongsToMany(User::class, 'like_tweet')->withTimestamps();
    }

    public function getLikesCountAttribute() {
        return $this->likes()->count();
    }

    public function getIsLikedAttribute() {
        $user = auth()->user();
        if (!$user) {
            return false;
        }
        return $this->likes()->where('user_id', $user->id)->exists();
    }

    protected $appends = ['likes_count', 'is_liked'];
}
