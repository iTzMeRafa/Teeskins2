<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

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

    public function fetchFirstAssets($assetType, $sortType, $query = '', $fetchAllTypes = false, $byUser = false) {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        // definitions for the query
        $tableType              = $assetType.'.'.$sortType;             // e.g skins.downloads
        $assetTypeIsPublic      = $assetType.'.isPublic';               // e.g skins.isPublic
        $assetTypeID            = $assetType.'.id';                     // e.g skins.id
        $assetTypeUserID        = $assetType.'.userID';                 // e.g skins.userID
        $assetTypeName          = $assetType.'.name';                   // e.g skins.name

        $assets = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetTypeUserID)
            ->selectRaw($assetType . '.*, users.name as username')
            ->where([
                [$assetTypeIsPublic, '=', 1],
                [$assetTypeName, 'like', '%'.$query.'%'],
                !$byUser ?: ["userID", "=", Auth::user()->id]
            ])
            ->orderByDesc($tableType)
            ->orderByDesc($assetTypeID)
            ->limit(
                !$fetchAllTypes
                    ? $this->numberPerLoadage
                    : ceil($this->numberPerLoadage / count($this->assetTypes))
            )
            ->get();

        foreach ($assets as $asset) {
            $asset->assetType = $assetType;
        }

        return $assets;
    }

    public function fetchAssetsFromDatabase($assetType, Request $request, $byUser = false) {
        if (!in_array($assetType, $this->assetTypes)) {
            return redirect()->route('error404');
        }

        // definitions for the query
        $seekDatas = json_decode($request->seekData, true);
        $lastAssetTypeValue     = $seekDatas[$assetType]['value'] ?? 0; // e.g 2019-09-29 00:56:42
        $lastAssetID            = $seekDatas[$assetType]['id'] ?? 0;    // e.g 51

        $tableType              = $assetType.'.'.$request->type;        // e.g skins.downloads
        $assetTypeAll           = $assetType.'.*';                      // e.g skins.*
        $assetTypeIsPublic      = $assetType.'.isPublic';               // e.g skins.isPublic
        $assetTypeID            = $assetType.'.id';                     // e.g skins.id
        $assetTypeUserID        = $assetType.'.userID';                 // e.g skins.userID
        $assetTypeName          = $assetType.'.name';                   // e.g skins.name


        /**
         * TODO: Rewrite the whereRaw condition. Try to prevent Raw Statements and use bindings!
         * Uses the sql seek method for fast performance.
         * @see https://dzone.com/articles/faster-sql-paging-jooq-using
         */
        $assets = DB::table($assetType)
            ->join('users', 'users.id', '=', $assetTypeUserID)
            ->where([
                [$assetTypeIsPublic, '=', 1],
                [$assetTypeName, 'like', '%'.$request->queryString.'%'],
                !$byUser ?: ["userID", "=", Auth::user()->id]
            ])
            ->whereRaw('('.$tableType.', '.$assetTypeID.') < ("'.$lastAssetTypeValue.'", '.$lastAssetID.')')
            ->selectRaw($assetTypeAll . ', users.name as username')
            ->orderByDesc($tableType)
            ->orderByDesc($assetTypeID)
            ->limit(ceil($this->numberPerLoadage / count($seekDatas)))
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
