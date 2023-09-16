<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <title>{{ env('VITE_ACARA') }}</title>
  <link rel="icon" type="image/svg+xml" href="{{ asset('/static-assets/favicon.svg') }}" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="title" content="{{ env('VITE_ACARA') }}">
  <meta name="description" content="{{ env('VITE_ACARA_DESCRIPTION') }}">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="{{ env('APP_URL') }}">
  <meta property="og:title" content="{{ env('VITE_ACARA') }}">
  <meta property="og:description" content="{{ env('VITE_ACARA_DESCRIPTION') }}">
  <meta property="og:image" itemprop="image" content="{{ asset('/static-assets/header-seo.jpg') }}">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="{{ env('APP_URL') }}">
  <meta property="twitter:title" content="{{ env('VITE_ACARA') }}">
  <meta property="twitter:description" content="{{ env('VITE_ACARA_DESCRIPTION') }}">
  <meta property="twitter:image" content="{{ asset('/static-assets/header-seo.jpg') }}">

  <!-- For Facebook Insights --!>

  @viteReactRefresh
  @vite(['resources/css/app.css', 'resources/js/main.tsx'])
</head>

<body>
  <div id="root"></div>
</body>

</html>
