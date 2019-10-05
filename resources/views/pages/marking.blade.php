@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Markings (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Markings Download (2000+ Markings)')

@section('content')
    <!-- Marking React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-marking.js') }}"></script>
@endsection
