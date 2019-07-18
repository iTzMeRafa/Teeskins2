@extends('layouts.app')

@section('content')
    <!-- Dashboard React Data -->
    <script>
        let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-dashboard.js') }}"></script>
@endsection
