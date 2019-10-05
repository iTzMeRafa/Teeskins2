@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Skins 0.6 & 0.7, Assets, Tools ▷ +2000 Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Teeworlds Skins, Mapres, Gameskins, Emoticons, Particles, Cursors, Grids & More!')

    @section('content')
        <!-- Home React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-home.js') }}"></script>
    @endsection
