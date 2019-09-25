@extends('layouts.app')

@section('content')
    <!-- Body React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-body.js') }}"></script>
@endsection
