@extends('layouts.app')

@section('pageDescription', 'Search & Find: Teeworlds Skins ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Search')

    @section('content')
        <!-- Search React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-search.js') }}"></script>
    @endsection
