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

// TODO: for dynamic urls {xyz} check if variable is allowable (in_array) -> redirect

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
Route::post('/download/{assetType}/{assetID}', 'DownloadsController@index')->name('download');
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

Route::post('/fetch/search', 'SearchController@fetchAssetsFromDatabase')->name('fetchSearchOffset');
Route::post('/fetch/asset/{assetType}', 'AssetController@fetchAssetsFromDatabase')->name('assetFetch');

Route::post('/fetch/userUploads', 'DashboardController@getUserUploads')->name('fetchUserUploadsOffset');
Route::post('/fetch/skinUploads', 'AdminpanelUploadSkinsController@getUnverifiedSkins')->name('fetchSkinUploadsOffset');
Route::post('/fetch/bodyUploads', 'AdminpanelUploadBodyController@getUnverifiedBody')->name('fetchBodyUploadsOffset');
Route::post('/fetch/decorationUploads', 'AdminpanelUploadDecorationController@getUnverifiedDecoration')->name('fetchDecorationUploadsOffset');
Route::post('/fetch/eyesUploads', 'AdminpanelUploadEyesController@getUnverifiedEyes')->name('fetchEyesUploadsOffset');
Route::post('/fetch/feetUploads', 'AdminpanelUploadFeetController@getUnverifiedFeet')->name('fetchFeetUploadsOffset');
Route::post('/fetch/handsUploads', 'AdminpanelUploadHandsController@getUnverifiedHands')->name('fetchHandsUploadsOffset');
Route::post('/fetch/markingUploads', 'AdminpanelUploadMarkingController@getUnverifiedMarking')->name('fetchMarkingUploadsOffset');
Route::post('/fetch/mapresUploads', 'AdminpanelUploadMapresController@getUnverifiedMarking')->name('fetchMapresUploadsOffset');
Route::post('/fetch/gameskinsUploads', 'AdminpanelUploadGameskinsController@getUnverifiedMarking')->name('fetchGameskinsUploadsOffset');
Route::post('/fetch/emoticonsUploads', 'AdminpanelUploadEmoticonsController@getUnverifiedMarking')->name('fetchEmoticonsUploadsOffset');
Route::post('/fetch/cursorsUploads', 'AdminpanelUploadCursorsController@getUnverifiedMarking')->name('fetchCursorsUploadsOffset');
Route::post('/fetch/particlesUploads', 'AdminpanelUploadParticlesController@getUnverifiedMarking')->name('fetchParticlesUploadsOffset');
Route::post('/fetch/gridsUploads', 'AdminpanelUploadGridsController@getUnverifiedMarking')->name('fetchGridsUploadsOffset');

// Admin
// -------------------------------------------------
Route::get('/adminpanel', 'AdminpanelController@index')->name('adminpanel'); //Stats, Charts, Notes etc...
Route::get('/adminpanel/userlist', 'AdminpanelUserlistController@index')->name('adminpanelUserlist');
Route::get('/adminpanel/reports', 'ReportController@index')->name('reports');

Route::get('/adminpanel/uploads/skin', 'AdminpanelUploadSkinsController@index')->name('adminpanelUploadSkins');
Route::get('/adminpanel/uploads/skin/{sortType}', 'AdminpanelUploadSkinsController@index')->name('adminpanelUploadSkins');

Route::get('/adminpanel/uploads/body', 'AdminpanelUploadBodyController@index')->name('adminpanelUploadBody');
Route::get('/adminpanel/uploads/body/{sortType}', 'AdminpanelUploadBodyController@index')->name('adminpanelUploadBody');

Route::get('/adminpanel/uploads/decoration', 'AdminpanelUploadDecorationController@index')->name('adminpanelUploadDecoration');
Route::get('/adminpanel/uploads/decoration/{sortType}', 'AdminpanelUploadDecorationController@index')->name('adminpanelUploadDecoration');

Route::get('/adminpanel/uploads/eyes', 'AdminpanelUploadEyesController@index')->name('adminpanelUploadEyes');
Route::get('/adminpanel/uploads/eyes/{sortType}', 'AdminpanelUploadEyesController@index')->name('adminpanelUploadEyes');

Route::get('/adminpanel/uploads/feet', 'AdminpanelUploadFeetController@index')->name('adminpanelUploadFeet');
Route::get('/adminpanel/uploads/feet/{sortType}', 'AdminpanelUploadFeetController@index')->name('adminpanelUploadFeet');

Route::get('/adminpanel/uploads/hands', 'AdminpanelUploadHandsController@index')->name('adminpanelUploadHands');
Route::get('/adminpanel/uploads/hands/{sortType}', 'AdminpanelUploadHandsController@index')->name('adminpanelUploadHands');

Route::get('/adminpanel/uploads/marking', 'AdminpanelUploadMarkingController@index')->name('adminpanelUploadMarking');
Route::get('/adminpanel/uploads/marking/{sortType}', 'AdminpanelUploadMarkingController@index')->name('adminpanelUploadMarking');

Route::get('/adminpanel/uploads/mapres', 'AdminpanelUploadMapresController@index')->name('adminpanelUploadMapres');
Route::get('/adminpanel/uploads/mapres/{sortType}', 'AdminpanelUploadMapresController@index')->name('adminpanelUploadMapres');

Route::get('/adminpanel/uploads/gameskins', 'AdminpanelUploadGameskinsController@index')->name('adminpanelUploadGameskins');
Route::get('/adminpanel/uploads/gameskins/{sortType}', 'AdminpanelUploadGameskinsController@index')->name('adminpanelUploadGameskins');

Route::get('/adminpanel/uploads/emoticons', 'AdminpanelUploadEmoticonsController@index')->name('adminpanelUploadEmoticons');
Route::get('/adminpanel/uploads/emoticons/{sortType}', 'AdminpanelUploadEmoticonsController@index')->name('adminpanelUploadEmoticons');

Route::get('/adminpanel/uploads/cursors', 'AdminpanelUploadCursorsController@index')->name('adminpanelUploadCursors');
Route::get('/adminpanel/uploads/cursors/{sortType}', 'AdminpanelUploadCursorsController@index')->name('adminpanelUploadCursors');

Route::get('/adminpanel/uploads/particles', 'AdminpanelUploadParticlesController@index')->name('adminpanelUploadParticles');
Route::get('/adminpanel/uploads/particles/{sortType}', 'AdminpanelUploadParticlesController@index')->name('adminpanelUploadParticles');

Route::get('/adminpanel/uploads/grids', 'AdminpanelUploadGridsController@index')->name('adminpanelUploadGrids');
Route::get('/adminpanel/uploads/grids/{sortType}', 'AdminpanelUploadGridsController@index')->name('adminpanelUploadGrids');

// API's
// -------------------------------------------------
Route::get('/api', 'APIController@index')->name('api');

Route::get('/api/{assetType}/', 'ApiJsonController@index')->name('assetApi');
Route::get('/api/{assetType}/{sortType}', 'ApiJsonController@index')->name('assetSortApi');

