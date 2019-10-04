@extends('layouts.app')

@section('content')
    <!-- Mapres React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-mapres.js') }}"></script>
@endsection
