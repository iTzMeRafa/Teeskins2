@extends('layouts.app')
@section('content')
    <!-- Admin Gameskins Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminGameskinsUpload.js') }}"></script>
@endsection
