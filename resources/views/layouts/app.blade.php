<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <!-- Meta Tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="@yield('pageDescription')" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('pageTitle') - {{ config('app.name', 'Teeskins') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Favicons -->
    <link rel="apple-touch-icon" sizes="57x57" href="{{ asset('img/favicons/apple-icon-57x57.png') }}">
    <link rel="apple-touch-icon" sizes="60x60" href="{{ asset('img/favicons/apple-icon-60x60.png') }}">
    <link rel="apple-touch-icon" sizes="72x72" href="{{ asset('img/favicons/apple-icon-72x72.png') }}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{ asset('img/favicons/apple-icon-76x76.png') }}">
    <link rel="apple-touch-icon" sizes="114x114" href="{{ asset('img/favicons/apple-icon-114x114.png') }}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{ asset('img/favicons/apple-icon-120x120.png') }}">
    <link rel="apple-touch-icon" sizes="144x144" href="{{ asset('img/favicons/apple-icon-144x144.png') }}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{ asset('img/favicons/apple-icon-152x152.png') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/favicons/apple-icon-180x180.png') }}">
    <link rel="icon" type="image/png" sizes="192x192"  href="{{ asset('img/favicons/android-icon-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicons/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('img/favicons/favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicons/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('img/favicons/manifest.json') }}">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="{{ asset('img/favicons/ms-icon-144x144.png') }}">
    <meta name="theme-color" content="#ffffff">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-101435750-4"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-101435750-4');
    </script>

    <!-- Sitelinks Searchbar -->
    <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://teeskins.de/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://teeskins.de/search/{search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
    </script>

    <!-- Logo -->
    <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://teeskins.de/",
          "logo": "https://teeskins.de/img/logo.png"
        }
    </script>

    <!-- Social Media -->
    <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Teeskins",
          "url": "https://teeskins.de/",
          "sameAs": [
            "https://www.facebook.com/Teeskins/",
            "https://github.com/iTzMeRafa/Teeskins"
          ]
        }
    </script>
</head>
<body onload="handlePreloader()">

    <!-- Preloader -->
    <div class="ipl-progress-indicator-head" id="progressBar">
        <div class="first-indicator"></div>
        <div class="second-indicator"></div>
    </div>

    <?php
    // Prevent Preloader for specific pages
    $currentPath = $_SERVER['REQUEST_URI'];
    $preventPages = ['/login', '/register', '/password/reset'];

    if (!in_array($currentPath, $preventPages)) {
    ?>
        <div id="preloader" class="preloader">
            @include('templates.preloader')
        </div>
    <?php } ?>

    <!-- UserPanel -->
    @include('templates.userPanel')

    <!-- Main Content -->
    <div id="app"></div>
    @yield('content')

<script>
    function handlePreloader() {
        setInterval( function() {
          const preloader = document.getElementById("preloader");
          const progressBar = document.getElementById("progressBar");
          document.body.style.overflow = "visible";

          if (preloader) {
            preloader.style.opacity = 0;
            preloader.style.visibility = "hidden";
          }

          if (progressBar) {
            progressBar.style.opacity = 0;
            progressBar.style.visibility = "hidden";
            progressBar.style.height = 0;
          }



        }, 500);
    }
</script>
</body>
</html>
