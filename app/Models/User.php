<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'name',
        'image',
        'bio',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function tweets() {
        return $this->hasMany(Tweet::class)->latest();
    }

    public function comments() {
        return $this->hasMany(Comment::class)->latest();
    }

    public function followings() {
        return $this->belongsToMany(User::class, 'follower_user', 'follower_id', 'user_id')->withTimestamps();
    }

    public function followers() {
        return $this->belongsToMany(User::class, 'follower_user', 'user_id', 'follower_id')->withTimestamps();
    }

    public function followerCount() {
        return $this->followers()->count();
    }

    public function follows(User $user) {
        return $this->followings()->where('user_id', $user->id)->exists();
    }

    public function getImageUrl() {
        if ($this->image) {
            return url('storage/'. $this->image);
        }
        return "https://api.dicebear.com/8.x/shapes/svg?seed={$this->name}";
    }

    public function likes() {
        return $this->belongsToMany(Tweet::class, 'like_tweet')->withTimestamps();
    }

    public function likesTweet(Tweet $tweet) {
        return $this->likes()->where('tweet_id', $tweet->id)->exists();
    }

    public function getFollowersCountAttribute() {
        return $this->followers()->count();
    }

    public function getIsFollowedAttribute() {
        $user = auth()->user();
        if (!$user) {
            return false;
        }
        return $user->follows($this);
    }

    protected $appends = ['followers_count', 'is_followed'];
}
