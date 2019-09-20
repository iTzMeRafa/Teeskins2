const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Home
mix.react('resources/js/app-home.tsx', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

// Skins
mix.react('resources/js/app-skins.tsx', 'public/js');

// Upload
mix.react('resources/js/app-upload.tsx', 'public/js');

// Settings
mix.react('resources/js/app-settings.tsx', 'public/js');

// Dashboard
mix.react('resources/js/app-dashboard.tsx', 'public/js');

// Search
mix.react('resources/js/app-search.tsx', 'public/js');

// Privacy Policies
mix.react('resources/js/app-privacyPolicies.tsx', 'public/js');

// Terms Of Use
mix.react('resources/js/app-termsOfUse.tsx', 'public/js');

// Admin Home
mix.react('resources/js/app-adminHome.tsx', 'public/js');

// Admin Userlist
mix.react('resources/js/app-adminUserlist.tsx', 'public/js');

// Admin Skins Upload
mix.react('resources/js/app-adminSkinsUpload.tsx', 'public/js');

// API
mix.react('resources/js/app-api.tsx', 'public/js');

// 404 Error Page
mix.react('resources/js/app-404.tsx', 'public/js');

// 500 Error Page
mix.react('resources/js/app-500.tsx', 'public/js');

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.vue', '.ts', '.tsx'],
    },
});