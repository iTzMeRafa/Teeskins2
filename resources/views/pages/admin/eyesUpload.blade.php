@extends('layouts.app')
@section('content')
    <!-- Admin Eyes Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminEyesUpload.js') }}"></script>
@endsection
