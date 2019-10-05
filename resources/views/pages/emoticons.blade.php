@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Emoticons ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Emoticons Download (2000+ Emoticons)')

@section('content')
    <!-- Emoticons React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-emoticons.js') }}"></script>
@endsection
