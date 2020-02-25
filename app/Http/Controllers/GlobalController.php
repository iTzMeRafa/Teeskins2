<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GlobalController extends Controller
{
    protected $numberPerLoadage = 10;
    protected $downloadableAwaitTimeInMinutes = 1;
    protected $assetTypes = [
        'skins',
        'body',
        'decoration',
        'eyes',
        'feet',
        'hands',
        'marking',
        'mapres',
        'gameskins',
        'emoticons',
        'cursors',
        'particles',
        'grids',
    ];

    protected function getGlobalPageData()
    {
        return [
            'totalItemsCount' => $this->getTotalItemsCount(),
            'userInfo' => $this->getUserInfo(),
        ];
    }

    protected function getHTTPStatusCodeFromUrl($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HEADER, true);    // we want headers
        curl_setopt($ch, CURLOPT_NOBODY, true);    // we don't need body
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        curl_setopt($ch, CURLOPT_TIMEOUT,10);
        $output = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return $httpCode;
    }

    protected function getTrendingAsset($assetType, $trendingType) {
        return DB::table($assetType)
            ->join('users', 'users.id', '=', $assetType .'.userID')
            ->where("isPublic", "=", 1)
            ->orderByDesc($trendingType)
            ->selectRaw($assetType .'.*, users.name as username')
            ->first();
    }

    protected function getAssetUploadsCount() {
        $assetsCount = [];
        foreach ($this->assetTypes as $assetType) {
            $assetsCount[$assetType] = DB::table($assetType)->where('isPublic', '=', 0)->count();
        }

        return $assetsCount;
    }

    protected function getUserIpAddress() {
        return $_SERVER['REMOTE_ADDR'];
    }

    private function getUserInfo() {
        return [
            'isLoggedIn' => Auth::check(),
            'id' => Auth::id(),
            'email' => Auth::check() ? Auth::user()->email : null,
            'username' => Auth::check() ? Auth::user()->name : null,
            'role' => Auth::check() ? Auth::user()->role : null,
            'assetLikes' => $this->getUserAssetLikes(),
            'ip' => $this->getUserIpAddress(),
        ];
    }

    private function getUserAssetLikes() {
        $userAssetLikes = null;

        foreach ($this->assetTypes as $assetType) {
            $userAssetLikes[$assetType] = $this->getUserAssetLikesMethod($assetType);
        }

        return $userAssetLikes;
    }

    private function getUserAssetLikesMethod($assetType) {
        $likes = [];
        if (!Auth::check()) {
            return $likes;
        }

        $assetLikes =
            DB::table('likes')
            ->select('assetID')
            ->where([
                ['assetType', '=', $assetType],
                ['userID', '=', Auth::id()]
            ])
            ->distinct()
            ->get();
        
        
        foreach ($assetLikes as $key => $assetLike) {
            $likes[$key] = $assetLike->assetID;
        }
        return $likes;
    }

    private function getTotalItemsCount() {
        $totalAssetsCount = 0;

        foreach ($this->assetTypes as $assetType) {
            $totalAssetsCount += $this->getItemsCountByAssetType($assetType);
        }

        return $totalAssetsCount;
    }

    private function getItemsCountByAssetType($assetType) {
        return DB::table($assetType)->where('isPublic', '=', 1)->count();
    }
}
