@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Particles ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Particles Download (2000+ Particles)')

@section('content')
    <!-- Particles React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-particles.js') }}"></script>
@endsection
