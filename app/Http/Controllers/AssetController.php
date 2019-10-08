<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssetController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($assetType, $sortType = 'id')
    {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        return view('pages/' . $assetType)->with("data", $this->getViewData($assetType, $sortType));
    }

    public function fetchAssetsFromDatabase($assetType, Request $request) {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        $tableType = $assetType . '.' .$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $assets = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetType . '.userID')
            ->where($assetType . ".isPublic", "=", 1)
            ->whereNotIn($assetType . '.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw($assetType . '.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($assets as $asset) {
            $asset->assetType = $assetType;
        }

        return $assets;
    }

    private function getViewData($assetType, $sortType) {

        // Create default Request for fetching Skins
        $defaultSkinRequest = new Request();
        $defaultSkinRequest->setMethod('POST');
        $defaultSkinRequest->request->add(['excludes' => '' ]);
        $defaultSkinRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                $assetType => $this->fetchAssetsFromDatabase($assetType, $defaultSkinRequest),
                'sortType' => $sortType,
                'page' => $assetType,
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
