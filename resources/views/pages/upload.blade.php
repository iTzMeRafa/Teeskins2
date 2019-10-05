@extends('layouts.app')

@section('pageDescription', 'Upload & Share: Teeworlds Skins ▷ 2000+ Teeworlds Graphics ✓ Extend the biggest Teeworlds Skins Collection ✓ Join Now ✓')
@section('pageTitle', 'Upload & Share')

    @section('content')
        <!-- Upload React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-upload.js') }}"></script>
    @endsection
