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
        $skins      = $this->fetchAssetsByType($request, "skin");
        $body       = $this->fetchAssetsByType($request, "body");
        $decoration = $this->fetchAssetsByType($request, "decoration");
        $eyes       = $this->fetchAssetsByType($request, "eyes");
        $feet       = $this->fetchAssetsByType($request, "feet");
        $hands      = $this->fetchAssetsByType($request, "hands");
        $marking    = $this->fetchAssetsByType($request, "marking");
        $mapres     = $this->fetchAssetsByType($request, "mapres");
        $gameskins  = $this->fetchAssetsByType($request, "gameskins");
        $emoticons  = $this->fetchAssetsByType($request, "emoticons");
        $cursors    = $this->fetchAssetsByType($request, "cursors");
        $particles  = $this->fetchAssetsByType($request, "particles");
        $grids      = $this->fetchAssetsByType($request, "grids");

        $allAssets = collect();
        $allAssets = $allAssets->merge($skins);
        $allAssets = $allAssets->merge($body);
        $allAssets = $allAssets->merge($decoration);
        $allAssets = $allAssets->merge($eyes);
        $allAssets = $allAssets->merge($feet);
        $allAssets = $allAssets->merge($hands);
        $allAssets = $allAssets->merge($marking);
        $allAssets = $allAssets->merge($mapres);
        $allAssets = $allAssets->merge($gameskins);
        $allAssets = $allAssets->merge($emoticons);
        $allAssets = $allAssets->merge($cursors);
        $allAssets = $allAssets->merge($particles);
        $allAssets = $allAssets->merge($grids);

        $assets = [];
        foreach ($allAssets as $_asset) {
            array_push($assets, $_asset);
        }

        return $assets;
    }

    private function fetchAssetsByType($request, $assetType) {
        $tableName = $assetType == "skin" ? "skins" : $assetType;
        $tableType = $tableName . '.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $asset = DB::table($tableName)
            ->join('users', 'users.id', '=', $tableName . '.userID')
            ->where("userID", "=", Auth::user()->id)
            ->whereNotIn($tableName . '.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw($tableName . '.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($asset as $_asset) {
            $_asset->assetType = $assetType;
        }

        return $asset;
    }

    private function getUserStatistics() {
        $uploadSkinsCount       = DB::table("skins")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadBodyCount        = DB::table("body")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadDecorationCount  = DB::table("decoration")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadEyesCount        = DB::table("eyes")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadFeetCount        = DB::table("feet")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadHandsCount       = DB::table("hands")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadMarkingCount     = DB::table("marking")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadMapresCount     = DB::table("mapres")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadGameskinsCount  = DB::table("gameskins")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadEmoticonsCount  = DB::table("emoticons")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadCursorsCount    = DB::table("cursors")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadParticlesCount  = DB::table("particles")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $uploadGridsCount      = DB::table("grids")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();

        $totalSkinsLikes        = DB::table("skins")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalBodyLikes         = DB::table("body")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalDecorationLikes   = DB::table("decoration")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalEyesLikes         = DB::table("eyes")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalFeetLikes         = DB::table("feet")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalHandsLikes        = DB::table("hands")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalMarkingLikes      = DB::table("marking")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalMapresLikes      = DB::table("mapres")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalGameskinsLikes   = DB::table("gameskins")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalEmoticonsLikes   = DB::table("emoticons")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalCursorsLikes     = DB::table("cursors")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalParticlesLikes   = DB::table("particles")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalGridsLikes       = DB::table("grids")->where("userID", "=", Auth::user()->id)->sum('likes');

        $totalSkinsDownloads        = DB::table("skins")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalBodyDownloads         = DB::table("body")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalDecorationDownloads   = DB::table("decoration")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalEyesDownloads         = DB::table("eyes")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalFeetDownloads         = DB::table("feet")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalHandsDownloads        = DB::table("hands")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalMarkingDownloads      = DB::table("marking")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalMapresDownloads      = DB::table("mapres")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalGameskinsDownloads   = DB::table("gameskins")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalEmoticonsDownloads   = DB::table("emoticons")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalCursorsDownloads     = DB::table("cursors")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalParticlesDownloads   = DB::table("particles")->where("userID", "=", Auth::user()->id)->sum('downloads');
        $totalGridsDownloads       = DB::table("grids")->where("userID", "=", Auth::user()->id)->sum('downloads');

        $uploadCount    = $uploadSkinsCount + $uploadBodyCount + $uploadDecorationCount + $uploadEyesCount + $uploadFeetCount + $uploadHandsCount + $uploadMarkingCount + $uploadMapresCount + $uploadGameskinsCount + $uploadEmoticonsCount + $uploadCursorsCount + $uploadParticlesCount + $uploadGridsCount;
        $totalLikes     = $totalSkinsLikes + $totalBodyLikes + $totalDecorationLikes + $totalEyesLikes + $totalFeetLikes + $totalHandsLikes + $totalMarkingLikes + $totalMapresLikes + $totalGameskinsLikes + $totalEmoticonsLikes + $totalCursorsLikes + $totalParticlesLikes + $totalGridsLikes;
        $totalDownloads = $totalSkinsDownloads + $totalBodyDownloads + $totalDecorationDownloads + $totalEyesDownloads + $totalFeetDownloads + $totalHandsDownloads + $totalMarkingDownloads + $totalMapresDownloads + $totalGameskinsDownloads + $totalEmoticonsDownloads + $totalCursorsDownloads + $totalParticlesDownloads + $totalGridsDownloads;

        return [
            'uploadCount' => $uploadCount,
            'totalLikes' => $totalLikes,
            'totalDownloads' => $totalDownloads,
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
