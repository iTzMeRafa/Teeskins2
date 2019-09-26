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
// -------------------------------------------------
Route::get('/', 'HomeController@index')->name('home');
Route::get('/upload', 'UploadController@index')->name('upload');
Route::get('/privacy-policies', 'PrivacyPoliciesController@index')->name('privacy-policies');
Route::get('/terms-of-use', 'TermsOfUseController@index')->name('terms-of-use');

Route::get('/search/{query}', 'SearchController@index')->name('search');
Route::get('/search/{query}/{sortType}', 'SearchController@index')->name('searchSort');

Route::get('/skins', 'SkinsController@index')->name('skins');
Route::get('/skins/{sortType}', 'SkinsController@index')->name('skinsSort');

Route::get('/body', 'BodyController@index')->name('body');
Route::get('/body/{sortType}', 'BodyController@index')->name('bodySort');

Route::get('/decoration', 'DecorationController@index')->name('decoration');
Route::get('/decoration/{sortType}', 'DecorationController@index')->name('decorationSort');

Route::get('/eyes', 'EyesController@index')->name('eyes');
Route::get('/eyes/{sortType}', 'EyesController@index')->name('eyesSort');

Route::get('/feet', 'FeetController@index')->name('feet');
Route::get('/feet/{sortType}', 'FeetController@index')->name('feetSort');

Route::get('/hands', 'HandsController@index')->name('hands');
Route::get('/hands/{sortType}', 'HandsController@index')->name('handsSort');

Route::get('/marking', 'MarkingController@index')->name('marking');
Route::get('/marking/{sortType}', 'MarkingController@index')->name('markingSort');

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
Route::post('/fetch/body', 'BodyController@fetchBodyFromDatabase')->name('fetchBodyOffset');
Route::post('/fetch/decoration', 'DecorationController@fetchDecorationFromDatabase')->name('fetchDecorationOffset');
Route::post('/fetch/eyes', 'EyesController@fetchEyesFromDatabase')->name('fetchEyesOffset');
Route::post('/fetch/feet', 'FeetController@fetchFeetFromDatabase')->name('fetchFeetOffset');
Route::post('/fetch/hands', 'HandsController@fetchHandsFromDatabase')->name('fetchHandsOffset');
Route::post('/fetch/marking', 'MarkingController@fetchMarkingFromDatabase')->name('fetchMarkingOffset');
Route::post('/fetch/search', 'SearchController@fetchAssetsFromDatabase')->name('fetchSearchOffset');
Route::post('/fetch/userUploads', 'DashboardController@getUserUploads')->name('fetchUserUploadsOffset');
Route::post('/fetch/skinUploads', 'AdminpanelUploadSkinsController@getUnverifiedSkins')->name('fetchSkinUploadsOffset');
Route::post('/fetch/bodyUploads', 'AdminpanelUploadBodyController@getUnverifiedBody')->name('fetchBodyUploadsOffset');
Route::post('/fetch/decorationUploads', 'AdminpanelUploadDecorationController@getUnverifiedDecoration')->name('fetchDecorationUploadsOffset');
Route::post('/fetch/eyesUploads', 'AdminpanelUploadEyesController@getUnverifiedEyes')->name('fetchEyesUploadsOffset');
Route::post('/fetch/feetUploads', 'AdminpanelUploadFeetController@getUnverifiedFeet')->name('fetchFeetUploadsOffset');
Route::post('/fetch/handsUploads', 'AdminpanelUploadHandsController@getUnverifiedHands')->name('fetchHandsUploadsOffset');
Route::post('/fetch/markingUploads', 'AdminpanelUploadMarkingController@getUnverifiedMarking')->name('fetchMarkingUploadsOffset');

// Admin
// -------------------------------------------------
Route::get('/adminpanel', 'AdminpanelController@index')->name('adminpanel'); //Stats, Charts, Notes etc...
Route::get('/adminpanel/userlist', 'AdminpanelUserlistController@index')->name('adminpanelUserlist');

/* AssetType must be singular */
Route::get('/adminpanel/uploads/skin', 'AdminpanelUploadSkinsController@index')->name('adminpanelUploadSkins');
Route::get('/adminpanel/uploads/skin/{sortType}', 'AdminpanelUploadSkinsController@index')->name('adminpanelUploadSkins');

Route::get('/adminpanel/uploads/body', 'AdminpanelUploadBodyController@index')->name('adminpanelUploadBody');
Route::get('/adminpanel/uploads/body/{sortType}', 'AdminpanelUploadBodyController@index')->name('adminpanelUploadBody');

Route::get('/adminpanel/uploads/decoration', 'AdminpanelUploadDecorationController@index')->name('adminpanelUploadDecoration');
Route::get('/adminpanel/uploads/decoration/{sortType}', 'AdminpanelUploadDecorationController@index')->name('adminpanelUploadDecoration');

Route::get('/adminpanel/uploads/eye', 'AdminpanelUploadEyesController@index')->name('adminpanelUploadEyes');
Route::get('/adminpanel/uploads/eye/{sortType}', 'AdminpanelUploadEyesController@index')->name('adminpanelUploadEyes');

Route::get('/adminpanel/uploads/feet', 'AdminpanelUploadFeetController@index')->name('adminpanelUploadFeet');
Route::get('/adminpanel/uploads/feet/{sortType}', 'AdminpanelUploadFeetController@index')->name('adminpanelUploadFeet');

Route::get('/adminpanel/uploads/hand', 'AdminpanelUploadHandsController@index')->name('adminpanelUploadHands');
Route::get('/adminpanel/uploads/hand/{sortType}', 'AdminpanelUploadHandsController@index')->name('adminpanelUploadHands');

Route::get('/adminpanel/uploads/marking', 'AdminpanelUploadMarkingController@index')->name('adminpanelUploadMarking');
Route::get('/adminpanel/uploads/marking/{sortType}', 'AdminpanelUploadMarkingController@index')->name('adminpanelUploadMarking');

// API's
// -------------------------------------------------
Route::get('/api', 'APIController@index')->name('api');

Route::get('/api/skins', 'APISkinsController@index')->name('apiSkins');
Route::get('/api/skins/{sortType}', 'APISkinsController@index')->name('apiSkinsSort');

Route::get('/api/body', 'APIBodyController@index')->name('apiBody');
Route::get('/api/body/{sortType}', 'APIBodyController@index')->name('apiBodySort');

Route::get('/api/decoration', 'APIDecorationController@index')->name('apiDecoration');
Route::get('/api/decoration/{sortType}', 'APIDecorationController@index')->name('apiDecorationSort');

Route::get('/api/eyes', 'APIEyesController@index')->name('apiEyes');
Route::get('/api/eyes/{sortType}', 'APIEyesController@index')->name('apiEyesSort');

Route::get('/api/feet', 'APIFeetController@index')->name('apiFeet');
Route::get('/api/feet/{sortType}', 'APIFeetController@index')->name('apiFeetSort');

Route::get('/api/hands', 'APIHandsController@index')->name('apiHands');
Route::get('/api/hands/{sortType}', 'APIHandsController@index')->name('apiHandsSort');

Route::get('/api/marking', 'APIMarkingController@index')->name('apiMarking');
Route::get('/api/marking/{sortType}', 'APIMarkingController@index')->name('apiMarkingSort');
