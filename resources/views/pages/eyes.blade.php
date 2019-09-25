@extends('layouts.app')

@section('content')
    <!-- Eyes React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-eyes.js') }}"></script>
@endsection
