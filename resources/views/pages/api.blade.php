@extends('layouts.app')

@section('pageDescription', 'Easy & Fast: Teeworlds API ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds API')

@section('content')
    <!-- API React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-api.js') }}"></script>
@endsection
