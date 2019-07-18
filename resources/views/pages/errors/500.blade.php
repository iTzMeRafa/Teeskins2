@extends('layouts.app')
    @section('content')
        <!-- 500 Error React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-500.js') }}"></script>
    @endsection
