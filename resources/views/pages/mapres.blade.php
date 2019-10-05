@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Mapres ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Mapres Download (2000+ Mapres)')

@section('content')
    <!-- Mapres React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-mapres.js') }}"></script>
@endsection
