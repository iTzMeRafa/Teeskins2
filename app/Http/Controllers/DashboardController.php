<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DashboardController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index($sortType = 'id') {
        return view('pages/dashboard')->with('data', $this->getViewData($sortType));
    }

    public function getUserUploads(Request $request) {

        $allAssets = collect();
        $assets = [];

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->fetchAssetsByType($request, $assetType);
            $allAssets = $allAssets->merge($asset);
        }

        foreach ($allAssets as $_asset) {
            array_push($assets, $_asset);
        }

        return $assets;
    }

    private function fetchAssetsByType($request, $assetType) {
        $tableType = $assetType . '.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $asset = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetType . '.userID')
            ->where("userID", "=", Auth::user()->id)
            ->whereNotIn($assetType . '.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw($assetType . '.*, users.name as username')
            ->limit(round($this->numberPerLoadage / count($this->assetTypes))) // Fetches for each assettype and adds all, but we want a total of 10 only
            ->get();

        foreach ($asset as $_asset) {
            $_asset->assetType = $assetType;
        }

        return $asset;
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

    private function getViewData($sortType) {

        // Create default Request for fetching Asset
        $defaultAssetRequest = new Request();
        $defaultAssetRequest->setMethod('POST');
        $defaultAssetRequest->request->add(['excludes' => '' ]);
        $defaultAssetRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'assets' => $this->getUserUploads($defaultAssetRequest),
                'statistics' => $this->getUserStatistics(),
                'sortType' => $sortType,
                'page' => 'dashboard',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
