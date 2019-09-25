@extends('layouts.app')

@section('content')
    <!-- Feet React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-feet.js') }}"></script>
@endsection
