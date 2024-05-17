<div class="card">
    <div class="px-3 pt-4 pb-2">
        <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
                <img style="width:50px" class="me-2 avatar-sm rounded-circle"
                    src="{{ $tweet->user->getImageUrl() }}" alt="{{ $tweet->user->name}}">
                <div>
                    <h5 class="card-title mb-0"><a href="{{ route('users.show', $tweet->user->id) }}"> {{ $tweet->user->name }}
                        </a></h5>
                </div>
            </div>
            <div class="d-flex">
                <a class="me-2" href="{{ route('tweets.show', $tweet->id) }}">View</a>
                @auth
                    @can('update', $tweet)
                        <a class="me-2" href="{{ route('tweets.edit', $tweet->id) }}">Edit</a>
                        <form action="{{ route('tweets.destroy', $tweet->id) }}" method="post">
                            @csrf
                            @method('delete')
                            <button type="submit" class="ms-1 btn btn-danger btn-sm">x</button>
                        </form>
                    @endcan
                @endauth
            </div>
        </div>
    </div>
    <div class="card-body">
        @if ($editing ?? false)
            <form action="{{ route('tweets.update', $tweet->id) }}" method="post">
                @csrf
                @method('put')
                <div class="mb-3">
                    <textarea name="content" class="form-control" id="idea" rows="3">{{ $tweet->content}}</textarea>
                    @error('content')
                        <span class="d-block fs-6 text-danger mt-2"> {{ $message }}</span>
                    @enderror
                </div>
                <div class="">
                    <button type="submit" class="btn btn-dark mb-4 btn-sm"> Update </button>
                </div>
            </form>
        @else
            <p class="fs-6 fw-light text-muted">
                {{ $tweet->content }}
            </p>
        @endif
        <div class="d-flex justify-content-between">
            @include('tweets.shared.like-button')
            <div>
                <span class="fs-6 fw-light text-muted">
                    {{ $tweet->created_at->diffForHumans()}} </span>
            </div>
        </div>
        @include('tweets.shared.comment-box')
    </div>
</div>
