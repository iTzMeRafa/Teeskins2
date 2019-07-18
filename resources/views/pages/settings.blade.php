@extends('layouts.app')

@section('content')
    <!-- Settings React Data -->
    <script>
        let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-settings.js') }}"></script>
@endsection
