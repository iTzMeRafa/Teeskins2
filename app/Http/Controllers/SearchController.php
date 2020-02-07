<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AssetController;

class SearchController extends GlobalController
{
    private $query;
    private $sortType;
    private $assetController;

    public function __construct()
    {
        $this->assetController = new AssetController();
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($query, $sortType = 'uploadDate')
    {
        $this->query = $query;
        $this->sortType = $sortType;
        return view('pages/search')->with('data', $this->getViewData());
    }

    public function collectFirstAssets() {
        $allAssets = collect();

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->assetController->fetchFirstAssets($assetType, $this->sortType, $this->query);
            $allAssets = $allAssets->merge($asset);
        }

        return $allAssets;
    }

    public function collectAssets(Request $request) {
        $allAssets = collect();

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->assetController->fetchAssetsFromDatabase($assetType, $request);
            $allAssets = $allAssets->merge($asset);
        }

        return $allAssets;
    }

    private function getViewData() {

        $viewData = [
            'viewData' =>  [
                'assets' => $this->collectFirstAssets(),
                'query' => $this->query,
                'sortType' => $this->sortType,
                'page' => 'search',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
