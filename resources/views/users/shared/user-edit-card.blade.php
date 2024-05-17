<div class="card">
    <div class="px-3 pt-4 pb-2">
        <form action="{{ route('users.update', $user->id) }}" method="post" enctype="multipart/form-data">
            @csrf
            @method('put')
            <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img style="width:150px" class="me-3 avatar-sm rounded-circle"
                        src="{{ $user->getImageUrl() }}" alt="Mario Avatar">
                    <div>
                        <input name="name" value="{{ $user->name }}" type="text" class="form-control">
                        @error('name')
                            <span class="text-danger fs-6">{{ $message }}</span>
                        @enderror
                    </div>
                </div>
                @auth
                    @if (Auth::id() === $user->id)
                        <div class="">
                            <a href="{{ route('users.show', $user->id) }}">View</a>
                        </div>
                    @endif
                @endauth
            </div>
            <div>
                <label class="mt-4" for="">Profile picture</label>
                <input type="file" class="form-control mt-1" name="image" id="">
            </div>
            <div class="px-2 mt-4">
                <h5 class="fs-5"> About : </h5>
                <div class="mb-3">
                    <textarea name="bio" id="bio" rows="3" class="form-control">{{ $user->bio }}</textarea>
                    @error('bio')
                        <span class="d-block fs-6 text-danger mt-2"> {{ $message }}</span>
                    @enderror
                </div>
                <div class="">
                    <button type="submit" class="btn btn-dark mb-4 btn-sm"> Update </button>
                </div>
                @include('users.shared.user-stats')
            </div>
        </form>
    </div>
</div>
