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

// Body
mix.react('resources/js/app-body.tsx', 'public/js');

// Decoration
mix.react('resources/js/app-decoration.tsx', 'public/js');

// Eyes
mix.react('resources/js/app-eyes.tsx', 'public/js');

// Feet
mix.react('resources/js/app-feet.tsx', 'public/js');

// Hands
mix.react('resources/js/app-hands.tsx', 'public/js');

// Marking
mix.react('resources/js/app-marking.tsx', 'public/js');

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

// Admin Body Upload
mix.react('resources/js/app-adminBodyUpload.tsx', 'public/js');

// Admin Decoration Upload
mix.react('resources/js/app-adminDecorationUpload.tsx', 'public/js');

// Admin Eyes Upload
mix.react('resources/js/app-adminEyesUpload.tsx', 'public/js');

// Admin Feet Upload
mix.react('resources/js/app-adminFeetUpload.tsx', 'public/js');

// Admin Hands Upload
mix.react('resources/js/app-adminHandsUpload.tsx', 'public/js');

// Admin Marking Upload
mix.react('resources/js/app-adminMarkingUpload.tsx', 'public/js');

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