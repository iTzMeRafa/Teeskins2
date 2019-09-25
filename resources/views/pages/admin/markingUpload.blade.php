@extends('layouts.app')
@section('content')
    <!-- Admin Marking Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminMarkingUpload.js') }}"></script>
@endsection
