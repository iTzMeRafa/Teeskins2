<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends GlobalController
{
    private $query;
    private $sortType;
    private $excludes;
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($query, $sortType = 'id')
    {
        $this->query = $query;
        $this->sortType = $sortType;
        return view('pages/search')->with('data', $this->getViewData());
    }

    public function fetchAssetsFromDatabase(Request $request) {
        $skins      = $this->fetchAssetsByType($request, "skin");
        $body       = $this->fetchAssetsByType($request, "body");
        $decoration = $this->fetchAssetsByType($request, "decoration");
        $eyes       = $this->fetchAssetsByType($request, "eyes");
        $feet       = $this->fetchAssetsByType($request, "feet");
        $hands      = $this->fetchAssetsByType($request, "hands");
        $marking    = $this->fetchAssetsByType($request, "marking");

        $allAssets = collect();
        $allAssets = $allAssets->merge($skins);
        $allAssets = $allAssets->merge($body);
        $allAssets = $allAssets->merge($decoration);
        $allAssets = $allAssets->merge($eyes);
        $allAssets = $allAssets->merge($feet);
        $allAssets = $allAssets->merge($hands);
        $allAssets = $allAssets->merge($marking);

        return $allAssets;
    }

    // TODO: Most hacky shit ever, but works for now
    private function fetchAssetsByType($request, $assetType, $withLimit = true, $typeOfReturn = 'get') {
        $tableName = $assetType == "skin" ? "skins" : $assetType;
        $tableType = $tableName . '.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $asset = DB::table($tableName)
            ->join('users', 'users.id', '=', $tableName . '.userID')
            ->where([
                [$tableName . '.name', 'like', '%' . $request->queryString . '%'],
                [$tableName . '.isPublic', '=', 1]
            ])
            ->whereNotIn($tableName . '.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw($tableName . '.*, users.name as username')
            ->limit($withLimit ? $this->numberPerLoadage : 9999999999999999)
            ->$typeOfReturn();

        if ($typeOfReturn == 'get') {
            foreach ($asset as $_asset) {
                $_asset->assetType = $assetType;
            }
        }

        return $asset;
    }

    private function countTotalAssets($request) {
        $skinsCount      = $this->fetchAssetsByType($request, "skin", false, 'count');
        $bodyCount       = $this->fetchAssetsByType($request, "body", false, 'count');
        $decorationCount = $this->fetchAssetsByType($request, "decoration", false, 'count');
        $eyesCount       = $this->fetchAssetsByType($request, "eyes", false, 'count');
        $feetCount       = $this->fetchAssetsByType($request, "feet", false, 'count');
        $handsCount      = $this->fetchAssetsByType($request, "hands", false, 'count');
        $markingCount    = $this->fetchAssetsByType($request, "marking", false, 'count');

        return $skinsCount + $bodyCount + $decorationCount + $eyesCount + $feetCount + $handsCount + $markingCount;
    }

    private function getViewData() {

        // Create default Request for fetching Assets
        $defaultAssetRequest = new Request();
        $defaultAssetRequest->setMethod('POST');
        $defaultAssetRequest->request->add(['excludes' => '']);
        $defaultAssetRequest->request->add(['type' => $this->sortType]);
        $defaultAssetRequest->request->add(['queryString' => $this->query]);

        $viewData = [
            'viewData' =>  [
                'assets' => $this->fetchAssetsFromDatabase($defaultAssetRequest),
                'countAssets' => $this->countTotalAssets($defaultAssetRequest),
                'query' => $this->query,
                'sortType' => $this->sortType,
                'page' => 'search',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
