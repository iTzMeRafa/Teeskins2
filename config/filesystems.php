<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'skins' => [
            'driver' => 'local',
            'root' => public_path() . '/database/skins' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'body' => [
            'driver' => 'local',
            'root' => public_path() . '/database/body' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'decoration' => [
            'driver' => 'local',
            'root' => public_path() . '/database/decoration' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'eyes' => [
            'driver' => 'local',
            'root' => public_path() . '/database/eyes' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'feet' => [
            'driver' => 'local',
            'root' => public_path() . '/database/feet' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'hands' => [
            'driver' => 'local',
            'root' => public_path() . '/database/hands' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'marking' => [
            'driver' => 'local',
            'root' => public_path() . '/database/marking' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'mapres' => [
            'driver' => 'local',
            'root' => public_path() . '/database/mapres' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'gameskins' => [
            'driver' => 'local',
            'root' => public_path() . '/database/gameskins' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'emoticons' => [
            'driver' => 'local',
            'root' => public_path() . '/database/emoticons' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'cursors' => [
            'driver' => 'local',
            'root' => public_path() . '/database/cursors' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'particles' => [
            'driver' => 'local',
            'root' => public_path() . '/database/particles' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        'grids' => [
            'driver' => 'local',
            'root' => public_path() . '/database/grids' ,
            'url' => env('APP_URL').'/storage',
            'visibility' => 'public',
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
        ],

    ],

];
