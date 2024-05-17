<div>
    @auth
        @if (Auth::user()->likesTweet($tweet))
        <form action="{{ route('tweets.unlike', $tweet->id) }}" method="post">
            @csrf
            <button type="submit" class="fw-light nav-link fs-6"> <span class="fas fa-heart me-1">
            </span> {{ $tweet->likes()->count() }} </button>
        </form>
        @else
            <form action="{{ route('tweets.like', $tweet->id) }}" method="post">
                @csrf
                <button type="submit" class="fw-light nav-link fs-6"> <span class="far fa-heart me-1">
                </span> {{ $tweet->likes()->count() }} </button>
            </form>
        @endif
    @endauth
    @guest
        <a  href="{{ route('login') }}" class="fw-light nav-link fs-6"> <span class="fas fa-heart me-1">
        </span> {{ $tweet->likes()->count() }} </a>
    @endguest
</div>


