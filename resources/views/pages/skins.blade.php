@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Skins ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Skins Download (2000+ Skins)')

@section('content')
    <!-- Skins React Data -->
    <script>
        let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-skins.js') }}"></script>
@endsection
