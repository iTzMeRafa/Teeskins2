@extends('layouts.app')
@section('content')
    <!-- Admin Emoticons Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminEmoticonsUpload.js') }}"></script>
@endsection
