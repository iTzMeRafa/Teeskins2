@extends('layouts.app')
@section('content')
    <!-- Admin Hands Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminHandsUpload.js') }}"></script>
@endsection
