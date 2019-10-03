<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Teeskins') }} - Teeworlds Assets Database</title>

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
            "https://github.com/iTzMeRafa/Teeskins",
          ]
        }
    </script>
</head>
<body>
    @include('templates.userPanel')
    <div id="app"></div>
    @yield('content')
</body>
</html>
