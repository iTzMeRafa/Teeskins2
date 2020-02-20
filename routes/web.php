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

// TODO: for all dynamic urls {xyz} check if variable is allowable (in_array) -> redirect

Auth::routes();

// Pages
// -------------------------------------------------
Route::get('/', 'HomeController@index')->name('home');
Route::get('/upload', 'UploadController@index')->name('upload');
Route::get('/privacy-policies', 'PrivacyPoliciesController@index')->name('privacy-policies');
Route::get('/terms-of-use', 'TermsOfUseController@index')->name('terms-of-use');
Route::get('/skinrenderer', 'SkinRendererController@index')->name('skinrenderer');
Route::get('/bodyrenderer', 'BodyRendererController@index')->name('bodyrenderer');

Route::get('/search/{query}', 'SearchController@index')->name('search');
Route::get('/search/{query}/{sortType}', 'SearchController@index')->name('searchSort');

Route::get('/download/{assetType}/{assetID}/{greyscale}', 'DownloadsController@download')->name('download');

// Asset Pages
// -------------------------------------------------
Route::get('/asset/{assetType}', 'AssetController@index')->name('asset');
Route::get('/asset/{assetType}/{sortType}', 'AssetController@index')->name('assetSort');

// Userpanels
// -------------------------------------------------
Route::get('/userpanel/dashboard', 'DashboardController@index')->name('dashboard');
Route::get('/userpanel/dashboard/{sortType}', 'DashboardController@index')->name('dashboardSort');
Route::get('/userpanel/settings', 'SettingsController@index')->name('settings');

// Error Pages
// -------------------------------------------------
Route::get('/error/404', 'ErrorController@error404')->name('error404');
Route::get('/error/500', 'ErrorController@error500')->name('error500');

// Actions
// -------------------------------------------------
Route::post('/upload', 'UploadController@uploadAsset')->name('uploadAsset');
Route::post('/download/increment/{assetType}/{assetID}', 'DownloadsController@increment')->name('downloadIncrement');
Route::post('/like/{assetType}/{assetID}', 'LikeController@index')->name('like');
Route::post('/unlike/{assetType}/{assetID}', 'UnlikeController@index')->name('unlike');
Route::post('/accept/{assetType}/{assetID}', 'VisibilityAssetController@setAssetVisible')->name('setAssetVisible');
Route::post('/hide/{assetType}/{assetID}', 'VisibilityAssetController@setAssetHide')->name('setAssetHide');
Route::post('/delete/{assetType}/{assetID}', 'DeleteAssetController@deleteAsset')->name('deleteAsset');
Route::post('/check/username/{username}', 'CheckController@username')->name('checkUsername');
Route::post('/check/assetName/{assetName}/{assetType}', 'CheckController@assetName')->name('checkAssetName');
Route::post('/check/email/{email}', 'CheckController@email')->name('checkEmail');
Route::post('/update/username/{username}', 'SettingsController@updateUsername')->name('updateUsername');
Route::post('/update/email/{email}', 'SettingsController@updateEmail')->name('updateEmail');
Route::post('/report/{assetType}/{assetID}/{reportReasonVal}/{reportReasonText}', 'ReportController@insertReport')->name('insertReprot');

Route::post('/fetch/search', 'SearchController@collectAssets')->name('fetchSearchOffset');
Route::post('/fetch/asset/{assetType}', 'AssetController@fetchAssetsFromDatabase')->name('assetFetch');

// Fetches
// -------------------------------------------------
Route::post('/fetch/userUploads', 'DashboardController@getUserUploads')->name('fetchUserUploadsOffset');
Route::post('/fetch/asset/unverified/{assetType}', 'AdminpanelAssetController@getUnverifiedAsset')->name('fetchUnverifiedAsset');

// Admin
// -------------------------------------------------
Route::get('/adminpanel', 'AdminpanelHomeController@index')->name('adminpanel'); //Stats, Charts, Notes etc...
Route::get('/adminpanel/userlist', 'AdminpanelUserlistController@index')->name('adminpanelUserlist');
Route::get('/adminpanel/reports', 'ReportController@index')->name('reports');
Route::get('/adminpanel/uploads/{assetType}', 'AdminpanelAssetController@index')->name('adminpanelUploadAsset');
Route::get('/adminpanel/uploads/{assetType}/{sortType}', 'AdminpanelAssetController@index')->name('adminpanelUploadAsset');

// API's
// -------------------------------------------------
Route::get('/api', 'APIController@index')->name('api');

Route::get('/api/{assetType}/', 'ApiJsonController@index')->name('assetApi');
Route::get('/api/{assetType}/{sortType}', 'ApiJsonController@index')->name('assetSortApi');

