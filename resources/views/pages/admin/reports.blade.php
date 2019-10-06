@extends('layouts.app')
@section('content')
    <!-- Reports React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminReports.js') }}"></script>
@endsection
