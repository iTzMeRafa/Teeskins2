@extends('layouts.app')

    @section('content')
        <!-- Search React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-search.js') }}"></script>
    @endsection
