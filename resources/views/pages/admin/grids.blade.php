@extends('layouts.app')
@section('content')
    <!-- Admin Grids Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminGridsUpload.js') }}"></script>
@endsection
