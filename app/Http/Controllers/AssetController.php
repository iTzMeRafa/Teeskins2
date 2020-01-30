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
    public function index($assetType, $sortType = 'uploadDate')
    {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        return view('pages/' . $assetType)->with("data", $this->getViewData($assetType, $sortType));
    }

    public function fetchFirstAssets($assetType, $sortType) {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        $assets = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetType . '.userID')
            ->selectRaw($assetType . '.*, users.name as username')
            ->where($assetType.'.isPublic', '=', 1)
            ->orderByDesc($assetType.'.'.$sortType)
            ->orderByDesc($assetType.'.id')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($assets as $asset) {
            $asset->assetType = $assetType;
        }

        return $assets;
    }

    public function fetchAssetsFromDatabase($assetType, Request $request) {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        // definitions for the query
        $tableType              = $assetType.'.'.$request->type;        // e.g skins.downloads
        $assetTypeAll           = $assetType.'.*';                      // e.g skins.*
        $assetTypeIsPublic      = $assetType.'.isPublic';               // e.g skins.isPublic
        $assetTypeID            = $assetType.'.id';                     // e.g skins.id
        $assetTypeUserID        = $assetType.'.userID';                 // e.g skins.userID

        /**
         * TODO: Rewrite the whereRaw condition. Try to prevent Raw Statements and use bindings!
         * Uses the sql seek method for fast performance.
         * @see https://dzone.com/articles/faster-sql-paging-jooq-using
         */
        $assets = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetTypeUserID)
            ->where($assetTypeIsPublic, '=', 1)
            ->whereRaw('('.$tableType.', '.$assetTypeID.') < ("'.$request->lastAssetTypeValue.'", '.$request->lastAssetID.')')
            ->selectRaw($assetTypeAll . ', users.name as username')
            ->orderByDesc($tableType)
            ->orderByDesc($assetTypeID)
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($assets as $asset) {
            $asset->assetType = $assetType;
        }

        return $assets;
    }

    private function getViewData($assetType, $sortType) {

        $viewData = [
            'viewData' =>  [
                $assetType => $this->fetchFirstAssets($assetType, $sortType),
                'sortType' => $sortType,
                'page' => $assetType,
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
