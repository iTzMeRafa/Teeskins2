<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/skins', 'SkinsController@index')->name('skins');
Route::post('/download/{assetType}/{assetID}', 'DownloadsController@index')->name('download');
Route::get('/privacy-policies', 'PrivacyPoliciesController@index')->name('privacy-policies');
Route::post('/like/{assetType}/{assetID}', 'LikeController@index')->name('like');
Route::post('/unlike/{assetType}/{assetID}', 'UnlikeController@index')->name('unlike');
