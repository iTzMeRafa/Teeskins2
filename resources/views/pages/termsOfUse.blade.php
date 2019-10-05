@extends('layouts.app')

@section('pageDescription', 'Download & Share: Teeworlds Skins ▷ 2000+ Teeworlds Graphics ✓ Biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Terms Of Use')

    @section('content')
        <!-- Terms Of Use React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-termsOfUse.js') }}"></script>
    @endsection
