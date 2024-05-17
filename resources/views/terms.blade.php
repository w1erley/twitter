@extends('layout.layout')

@section('content')
    <div class="row">
        <div class="col-3">
            @include('shared.left-sidebar')
        </div>
        <div class="col-6">
            <h1>Terms</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis eveniet quas perferendis quam
                temporibus magni
                voluptates iste eos aliquid iure laborum alias doloribus eligendi, nesciunt veritatis facilis rerum dicta
                vero.
            </p>
        </div>
        <div class="col-3">
            @include('shared.search-bar')
            @include('shared.follow-box')
        </div>
    </div>
@endsection
