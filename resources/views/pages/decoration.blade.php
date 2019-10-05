@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Decoration (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Decorations Download (2000+ Decorations)')

@section('content')
    <!-- Decoration React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-decoration.js') }}"></script>
@endsection
