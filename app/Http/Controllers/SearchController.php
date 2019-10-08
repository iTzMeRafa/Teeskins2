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
        $allAssets = collect();

        foreach ($this->assetTypes as $assetType) {
            $asset = $this->fetchAssetsByType($request, $assetType);
            $allAssets = $allAssets->merge($asset);
        }

        return $allAssets;
    }

    // TODO: Most hacky shit ever, but works for now | Does fetch the skins and count them to prevent duplicate code
    private function fetchAssetsByType($request, $assetType, $withLimit = true, $typeOfReturn = 'get') {
        $tableType = $assetType . '.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $asset = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetType . '.userID')
            ->where([
                [$assetType . '.name', 'like', '%' . $request->queryString . '%'],
                [$assetType . '.isPublic', '=', 1]
            ])
            ->whereNotIn($assetType . '.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw($assetType . '.*, users.name as username')
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

        $assetsTotalCount = 0;

        foreach ($this->assetTypes as $assetType) {
            $assetsTotalCount += $this->fetchAssetsByType($request, $assetType, false, 'count');
        }

        return $assetsTotalCount;
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
