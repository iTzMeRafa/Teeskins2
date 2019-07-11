@extends('layouts.app')

    @section('content')
        <!-- Privacy Policies React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-privacyPolicies.js') }}"></script>
    @endsection
