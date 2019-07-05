@extends('layouts.app')

@section('content')
    <!-- Skins React Data -->
    <script>
        let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-skins.js') }}"></script>
@endsection
