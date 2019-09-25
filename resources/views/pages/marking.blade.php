@extends('layouts.app')

@section('content')
    <!-- Marking React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-marking.js') }}"></script>
@endsection
