@extends('layouts.app')
@section('content')
    <!-- Admin Mapres Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminMapresUpload.js') }}"></script>
@endsection
