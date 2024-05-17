@extends('layout.layout')

@section('content')
<div class="row">
    <div class="col-3">
        @include('shared.left-sidebar')
    </div>
    <div class="col-6">
        @include('shared.success-message')
        <div class="mt-3">
            @include('users.shared.user-card')
        </div>
        <hr>
        @forelse ($tweets as $tweet)
            <div class="mt-3">
                @include('tweets.shared.tweet-card')
            </div>
        @empty
            <p class="my-3">No results found for "{{ request('search', '') }}"</p>
        @endforelse
        <div class="mt-3">
            {{ $tweets->withQueryString()->links() }}
        </div>
    </div>
    <div class="col-3">
        @include('shared.search-bar')
        @include('shared.follow-box')
    </div>
</div>
@endsection
