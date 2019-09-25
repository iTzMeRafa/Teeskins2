@extends('layouts.app')
@section('content')
    <!-- Admin Feet Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminFeetUpload.js') }}"></script>
@endsection
