@extends('layouts.app')

    @section('content')
        <!-- Terms Of Use React Data -->
        <script>
            let data = JSON.parse(['{!! $data !!}']);
        </script>
        <script src="{{ mix('js/app-termsOfUse.js') }}"></script>
    @endsection
