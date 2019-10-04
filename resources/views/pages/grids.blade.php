@extends('layouts.app')

@section('content')
    <!-- Grids React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-grids.js') }}"></script>
@endsection
