@extends('layouts.app')

@section('pageDescription', 'Live Preview: Teeworlds Skin Renderer ▷ Render your Teeworlds Skin Live in Browser ✓ Best Teeworlds Tools ✓ Test Now ✓')
@section('pageTitle', 'Teeworlds Skin Render Preview')

@section('content')
    <!-- SkinRenderer React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-skinrenderer.js') }}"></script>
@endsection
