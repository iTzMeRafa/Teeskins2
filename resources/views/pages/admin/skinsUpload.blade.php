@extends('layouts.app')
    @section('content')
        <!-- Admin Skins Upload React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-adminSkinsUpload.js') }}"></script>
    @endsection
