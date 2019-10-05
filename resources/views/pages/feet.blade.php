@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Feet (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Feets Downlaod (2000+ Feets)')

@section('content')
    <!-- Feet React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-feet.js') }}"></script>
@endsection
