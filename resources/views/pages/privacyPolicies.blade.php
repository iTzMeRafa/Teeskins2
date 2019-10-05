@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Skins ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Privacy Policies')

    @section('content')
        <!-- Privacy Policies React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-privacyPolicies.js') }}"></script>
    @endsection
