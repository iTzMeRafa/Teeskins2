@extends('layouts.app')

@section('content')
    <!-- Hands React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-hands.js') }}"></script>
@endsection
