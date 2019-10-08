@extends('layouts.app')
@section('content')
    <!-- Admin Cursors Upload React Data -->
    <script>
      let data = JSON.parse(['{!! $data !!}']);
    </script>
    <script src="{{ mix('js/app-adminCursorsUpload.js') }}"></script>
@endsection
