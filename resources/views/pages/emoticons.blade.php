@extends('layouts.app')

@section('content')
    <!-- Emoticons React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-emoticons.js') }}"></script>
@endsection
