@auth
<h4> Share your tweets </h4>
<div class="row">
    <form action="{{ route('tweets.store') }}" method="post">
        @csrf
        <div class="mb-3">
            <textarea name="content" class="form-control" id="idea" rows="3"></textarea>
            @error('content')
                <span class="d-block fs-6 text-danger mt-2"> {{ $message }}</span>
            @enderror
        </div>
        <button type="submit" class="btn btn-dark"> Share </button>
    </form>
</div>
@endauth
@guest
    <h4>Login to share tweet</h2>
@endguest
