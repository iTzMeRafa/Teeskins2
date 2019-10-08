@extends('layouts.app')
@section('content')
    <!-- Admin Decoration Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminDecorationUpload.js') }}"></script>
@endsection
