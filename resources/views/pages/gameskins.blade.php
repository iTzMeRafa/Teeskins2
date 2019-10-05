@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Gameskins ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Gameskins Download (2000+ Gameskins)')

@section('content')
    <!-- Gameskins React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-gameskins.js') }}"></script>
@endsection
