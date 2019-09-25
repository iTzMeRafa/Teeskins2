@extends('layouts.app')

@section('content')
    <!-- Decoration React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-decoration.js') }}"></script>
@endsection
