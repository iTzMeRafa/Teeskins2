@extends('layouts.app')
    @section('content')
        <!-- 404 Error React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-404.js') }}"></script>
    @endsection
