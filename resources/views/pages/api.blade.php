@extends('layouts.app')
@section('content')
    <!-- API React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-api.js') }}"></script>
@endsection
