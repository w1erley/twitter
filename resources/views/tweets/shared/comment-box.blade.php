<div>
    <form action="{{ route('tweets.comments.store', $tweet->id) }}" method="post">
        @csrf
        <div class="mb-3">
            <textarea name="content" class="fs-6 mt-3 form-control" rows="1"></textarea>
            @error('content')
                <span class="d-block fs-6 text-danger mt-2"> {{ $message }}</span>
            @enderror
        </div>
        <div>
            <button type="submit" class="btn btn-primary btn-sm mb-1"> Post Comment </button>
        </div>
    </form>
    @if($tweet->comments != "[]")
        <hr>
    @endif
    @foreach ($tweet->comments as $comment)
        <div class="d-flex align-items-start">
            <img style="width:35px" class="me-2 avatar-sm rounded-circle"
                src="{{ $comment->user->getImageUrl() }}"
                alt="{{ $comment->user->name }}">
            <div class="w-100">
                <div class="d-flex justify-content-between">
                    <h6 class="">{{ $comment->user->name }}
                    </h6>
                    <small class="fs-6 fw-light text-muted">{{ $comment->created_at->diffForHumans() }}</small>
                </div>
                <p class="fs-6 mt-3 fw-light">
                    {{ $comment->content }}
                </p>
            </div>
        </div>
    @endforeach
</div>
