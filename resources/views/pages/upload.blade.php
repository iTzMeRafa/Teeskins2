@extends('layouts.app')

    @section('content')
        <!-- Upload React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-upload.js') }}"></script>
    @endsection
