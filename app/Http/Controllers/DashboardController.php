<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\AssetController;

class DashboardController extends GlobalController
{
    private $assetController;
    private $sortType;

    public function __construct()
    {
        $this->middleware('auth');
        $this->assetController = new AssetController();
    }
    
    public function index($sortType = 'uploadDate') {
        $this->sortType = $sortType;
        return view('pages/dashboard')->with('data', $this->getViewData());
    }

    public function getFirstUserUploads() {
        $allAssets = collect();

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->assetController->fetchFirstAssets($assetType, $this->sortType, '', true, true);
            $allAssets = $allAssets->merge($asset);
        }

        return $allAssets;
    }

    public function getUserUploads(Request $request) {
        $allAssets = collect();

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->assetController->fetchAssetsFromDatabase($assetType, $request, true);
            $allAssets = $allAssets->merge($asset);
        }

        return $allAssets;
    }

    private function getUserStatistics() {

        $assetUploadsCount = 0;
        $assetLikesCount = 0;
        $assetDownloadsCount = 0;

        foreach ($this->assetTypes as $assetType) {
            $assetUploadsCount += DB::table($assetType)->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
            $assetLikesCount += DB::table($assetType)->where("userID", "=", Auth::user()->id)->sum('likes');
            $assetDownloadsCount += DB::table($assetType)->where("userID", "=", Auth::user()->id)->sum('downloads');
        }

        return [
            'uploadCount' => $assetUploadsCount,
            'totalLikes' => $assetLikesCount,
            'totalDownloads' => $assetDownloadsCount,
        ];
    }

    private function getViewData() {

        $viewData = [
            'viewData' => [
                'assets' => $this->getFirstUserUploads(),
                'statistics' => $this->getUserStatistics(),
                'sortType' => $this->sortType,
                'page' => 'dashboard',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
