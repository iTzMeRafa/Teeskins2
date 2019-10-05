@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Grids (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Grids Download (2000+ Grids)')

@section('content')
    <!-- Grids React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-grids.js') }}"></script>
@endsection
