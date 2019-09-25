@extends('layouts.app')
@section('content')
    <!-- Admin Body Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminBodyUpload.js') }}"></script>
@endsection
