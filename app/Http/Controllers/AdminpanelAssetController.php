<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelAssetController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($assetType, $sortType = 'id') {
        return view('pages/admin/'.$assetType)->with('data', $this->getViewData($assetType, $sortType));
    }

    public function getUnverifiedAsset($assetType, Request $request) {
        $tableType = $assetType.'.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $assets = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetType.'.userID')
            ->where($assetType.".isPublic", "=", 0)
            ->whereNotIn($assetType.'.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw($assetType.'.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($assets as $asset) {
            $asset->assetType = $assetType;
        }

        return $assets;
    }

    private function getViewData($assetType, $sortType) {

        // Create default Request for fetching Body
        $defaultBodyRequest = new Request();
        $defaultBodyRequest->setMethod('POST');
        $defaultBodyRequest->request->add(['excludes' => '' ]);
        $defaultBodyRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                $assetType => $this->getUnverifiedAsset($assetType, $defaultBodyRequest),
                'sortType' => $sortType,
                'page' => 'admin'.$assetType,
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

