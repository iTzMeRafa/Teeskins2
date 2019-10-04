@extends('layouts.app')

@section('content')
    <!-- Gameskins React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-gameskins.js') }}"></script>
@endsection
