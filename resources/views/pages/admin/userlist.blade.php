@extends('layouts.app')
    @section('content')
        <!-- Admin Userlist React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-adminUserlist.js') }}"></script>
    @endsection
