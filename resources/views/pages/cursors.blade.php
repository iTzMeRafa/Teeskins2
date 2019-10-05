@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Cursors ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Cursors Download (2000+ Cursors)')

@section('content')
    <!-- Cursors React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-cursors.js') }}"></script>
@endsection
