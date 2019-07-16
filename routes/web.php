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

// Pages
Route::get('/', 'HomeController@index')->name('home');
Route::get('/skins', 'SkinsController@index')->name('skins');
Route::get('/upload', 'UploadController@index')->name('upload');
Route::get('/privacy-policies', 'PrivacyPoliciesController@index')->name('privacy-policies');
Route::get('/terms-of-use', 'TermsOfUseController@index')->name('terms-of-use');

// Actions
Route::post('/upload', 'UploadController@uploadAsset')->name('uploadAsset');
Route::post('/download/{assetType}/{assetID}', 'DownloadsController@index')->name('download');
Route::post('/like/{assetType}/{assetID}', 'LikeController@index')->name('like');
Route::post('/unlike/{assetType}/{assetID}', 'UnlikeController@index')->name('unlike');

// Admin
Route::get('/adminpanel', 'AdminpanelController@index')->name('adminpanel'); //Stats, Charts, Notes etc...
Route::get('/adminpanel/uploads/skin', 'AdminpanelUploadSkinsController@index')->name('adminpanelUploadSkins'); //All uploads not public yet to review and accept them
