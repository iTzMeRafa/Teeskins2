<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <!-- Meta Tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Download & Share: Teeworlds Skins 0.6 & 0.7 ▷ +2000 Teeworlds Skins ✓ Biggest Skins Collection ✓ Join Now ✓" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Teeskins') }} - Teeworlds Skins Database</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

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
    <div id="preloader" class="preloader"></div>

    @include('templates.userPanel')
    <div id="app"></div>
    @yield('content')

<script>
    function handlePreloader() {
        setInterval( function() {
          const preloader = document.getElementById("preloader");
          const progressBar = document.getElementById("progressBar");
          preloader.style.opacity = 0;
          preloader.style.visibility = "hidden";
          progressBar.style.opacity = 0;
          progressBar.style.visibility = "hidden";
          progressBar.style.height = 0;
        }, 500);
    }
</script>
</body>
</html>
