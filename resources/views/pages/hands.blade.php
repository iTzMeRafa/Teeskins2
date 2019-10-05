@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Hands (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Hands Download (2000+ Hands)')

@section('content')
    <!-- Hands React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-hands.js') }}"></script>
@endsection
