@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Body (0.7) ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Bodys Download (2000+ Bodys)')

@section('content')
    <!-- Body React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-body.js') }}"></script>
@endsection
