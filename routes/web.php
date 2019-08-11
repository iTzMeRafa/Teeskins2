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
Route::get('/search/{query}', 'SearchController@index')->name('search');
Route::get('/upload', 'UploadController@index')->name('upload');
Route::get('/privacy-policies', 'PrivacyPoliciesController@index')->name('privacy-policies');
Route::get('/terms-of-use', 'TermsOfUseController@index')->name('terms-of-use');

// Userpanels
Route::get('/userpanel/dashboard', 'DashboardController@index')->name('dashboard');
Route::get('/userpanel/settings', 'SettingsController@index')->name('settings');

// Error Pages
Route::get('/error/404', 'ErrorController@error404')->name('error404');
Route::get('/error/500', 'ErrorController@error500')->name('error500');

// Actions
Route::post('/upload', 'UploadController@uploadAsset')->name('uploadAsset');
Route::post('/download/{assetType}/{assetID}', 'DownloadsController@index')->name('download');
Route::post('/like/{assetType}/{assetID}', 'LikeController@index')->name('like');
Route::post('/unlike/{assetType}/{assetID}', 'UnlikeController@index')->name('unlike');
Route::post('/accept/{assetType}/{assetID}', 'VisibilityAssetController@setAssetVisible')->name('setAssetVisible');
Route::post('/hide/{assetType}/{assetID}', 'VisibilityAssetController@setAssetHide')->name('setAssetHide');
Route::post('/delete/{assetType}/{assetID}', 'DeleteAssetController@deleteAsset')->name('deleteAsset');
Route::post('/check/username/{username}', 'CheckController@username')->name('checkUsername');
Route::post('/check/assetName/{assetName}', 'CheckController@assetName')->name('checkAssetName');
Route::post('/check/email/{email}', 'CheckController@email')->name('checkEmail');
Route::post('/update/username/{username}', 'SettingsController@updateUsername')->name('updateUsername');
Route::post('/update/email/{email}', 'SettingsController@updateEmail')->name('updateEmail');
Route::post('/fetch/skins', 'SkinsController@fetchSkinsFromDatabase')->name('fetchSkinsOffset');

// Admin
Route::get('/adminpanel', 'AdminpanelController@index')->name('adminpanel'); //Stats, Charts, Notes etc...
Route::get('/adminpanel/userlist', 'AdminpanelUserlistController@index')->name('adminpanelUserlist');

/* AssetType must be singular */
Route::get('/adminpanel/uploads/skin', 'AdminpanelUploadSkinsController@index')->name('adminpanelUploadSkins');
