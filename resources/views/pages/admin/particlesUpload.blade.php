@extends('layouts.app')
@section('content')
    <!-- Admin Particles Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminParticlesUpload.js') }}"></script>
@endsection
