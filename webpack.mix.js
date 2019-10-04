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

// Main Pages
// -------------------------------------------------

mix.react('resources/js/app-home.tsx', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

mix.react('resources/js/app-search.tsx', 'public/js');

mix.react('resources/js/app-upload.tsx', 'public/js');

mix.react('resources/js/app-privacyPolicies.tsx', 'public/js');

mix.react('resources/js/app-termsOfUse.tsx', 'public/js');

mix.react('resources/js/app-api.tsx', 'public/js');

// Assets
// -------------------------------------------------
mix.react('resources/js/app-skins.tsx', 'public/js');

mix.react('resources/js/app-body.tsx', 'public/js');

mix.react('resources/js/app-decoration.tsx', 'public/js');

mix.react('resources/js/app-eyes.tsx', 'public/js');

mix.react('resources/js/app-feet.tsx', 'public/js');

mix.react('resources/js/app-hands.tsx', 'public/js');

mix.react('resources/js/app-marking.tsx', 'public/js');

mix.react('resources/js/app-mapres.tsx', 'public/js');

mix.react('resources/js/app-gameskins.tsx', 'public/js');

mix.react('resources/js/app-emoticons.tsx', 'public/js');

mix.react('resources/js/app-cursors.tsx', 'public/js');

mix.react('resources/js/app-particles.tsx', 'public/js');

mix.react('resources/js/app-grids.tsx', 'public/js');

// User Pages
// -------------------------------------------------
mix.react('resources/js/app-settings.tsx', 'public/js');

mix.react('resources/js/app-dashboard.tsx', 'public/js');

// Admin Pages
// -------------------------------------------------
mix.react('resources/js/app-adminHome.tsx', 'public/js');

mix.react('resources/js/app-adminUserlist.tsx', 'public/js');

mix.react('resources/js/app-adminSkinsUpload.tsx', 'public/js');

mix.react('resources/js/app-adminBodyUpload.tsx', 'public/js');

mix.react('resources/js/app-adminDecorationUpload.tsx', 'public/js');

mix.react('resources/js/app-adminEyesUpload.tsx', 'public/js');

mix.react('resources/js/app-adminFeetUpload.tsx', 'public/js');

mix.react('resources/js/app-adminHandsUpload.tsx', 'public/js');

mix.react('resources/js/app-adminMarkingUpload.tsx', 'public/js');

mix.react('resources/js/app-adminMapresUpload.tsx', 'public/js');

mix.react('resources/js/app-adminGameskinsUpload.tsx', 'public/js');

mix.react('resources/js/app-adminEmoticonsUpload.tsx', 'public/js');

mix.react('resources/js/app-adminCursorsUpload.tsx', 'public/js');

mix.react('resources/js/app-adminParticlesUpload.tsx', 'public/js');

mix.react('resources/js/app-adminGridsUpload.tsx', 'public/js');


// Error Pages
// -------------------------------------------------
mix.react('resources/js/app-404.tsx', 'public/js');

mix.react('resources/js/app-500.tsx', 'public/js');

// Account Pages
// -------------------------------------------------
mix.react('resources/js/app-login.tsx', 'public/js');

mix.react('resources/js/app-register.tsx', 'public/js');

mix.react('resources/js/app-passwordReset.tsx', 'public/js');

mix.react('resources/js/app-passwordEmail.tsx', 'public/js');

mix.react('resources/js/app-passwordVerify.tsx', 'public/js');

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