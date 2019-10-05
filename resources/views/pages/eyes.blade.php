@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Eyes (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Eyes Download (2000+ Eyes)')

@section('content')
    <!-- Eyes React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-eyes.js') }}"></script>
@endsection
