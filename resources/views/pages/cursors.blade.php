@extends('layouts.app')

@section('content')
    <!-- Cursors React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-cursors.js') }}"></script>
@endsection
