@extends('layouts.app')

@section('content')
    <!-- Particles React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-particles.js') }}"></script>
@endsection
