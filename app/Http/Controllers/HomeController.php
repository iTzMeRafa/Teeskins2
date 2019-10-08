<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends GlobalController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    /*public function __construct()
    {
        $this->middleware('auth');
    } */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('pages/home')->with("data", $this->getViewData());
    }

    private function SortObjectByKeysDesc($a, $b) {
        return strcmp($b->uploadDate, $a->uploadDate);
    }

    private function SortObjectByKeysAsc($a, $b) {
        return strcmp($a->uploadDate, $b->uploadDate);
    }

    private function getNewestAsset() {
        $newestAssets = [];

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->getTrendingAsset($assetType, 'uploadDate');
            $asset->assetType = $assetType;
            array_push($newestAssets, $asset);
        }

        usort($newestAssets, [$this, "SortObjectByKeysDesc"]);
        return $newestAssets[0];
    }

    private function getMostDownloadedAsset() {
        $mostDownloadedAsset = [];

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->getTrendingAsset($assetType, 'downloads');
            $asset->assetType = $assetType;
            array_push($mostDownloadedAsset, $asset);
        }

        usort($mostDownloadedAsset, [$this, "SortObjectByKeysAsc"]);
        return $mostDownloadedAsset[0];
    }

    private function getMostLikedAsset() {
        $mostLikedAssets = [];

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->getTrendingAsset($assetType, 'likes');
            $asset->assetType = $assetType;
            array_push($mostLikedAssets, $asset);
        }

        usort($mostLikedAssets, [$this, "SortObjectByKeysAsc"]);
        return $mostLikedAssets[0];
    }

    private function getViewData() {
        $viewData = [
            'viewData' =>  [
                'mostDownloadedAsset' => $this->getMostDownloadedAsset(),
                'mostLikedAsset' => $this->getMostLikedAsset(),
                'newestAsset' => $this->getNewestAsset(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
