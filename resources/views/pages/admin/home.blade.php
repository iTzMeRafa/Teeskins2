@extends('layouts.app')
    @section('content')
        <!-- Admin Home React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-adminHome.js') }}"></script>
    @endsection
