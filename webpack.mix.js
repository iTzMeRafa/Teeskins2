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

// Privacy Policies
mix.react('resources/js/app-privacyPolicies.tsx', 'public/js');

// Terms Of Use
mix.react('resources/js/app-termsOfUse.tsx', 'public/js');

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