@extends('layouts.app')

@section('pageDescription', 'Live Preview: Teeworlds Body Renderer ▷ Render your Teeworlds Body Skin Live in Browser ✓ Best Teeworlds Tools ✓ Test Now ✓')
@section('pageTitle', 'Teeworlds Body Render Preview')

@section('content')
    <!-- BodyRenderer React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-bodyrenderer.js') }}"></script>
@endsection
