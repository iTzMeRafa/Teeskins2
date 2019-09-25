<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GlobalController extends Controller
{
    protected $numberPerLoadage = 10;

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

    private function getUserInfo() {
        return [
            'isLoggedIn' => Auth::check(),
            'id' => Auth::id(),
            'email' => Auth::check() ? Auth::user()->email : null,
            'username' => Auth::check() ? Auth::user()->name : null,
            'role' => Auth::check() ? Auth::user()->role : null,
            'assetLikes' => $this->getUserAssetLikes(),
        ];
    }

    private function getUserAssetLikes() {
        return [
            'skins' => $this->getUserAssetLikesMethod('skin'),
            'body' => $this->getUserAssetLikesMethod('body'),
            'decoration' => $this->getUserAssetLikesMethod('decoration'),
            'eyes' => $this->getUserAssetLikesMethod('eyes'),
            'feet' => $this->getUserAssetLikesMethod('feet'),
            'hands' => $this->getUserAssetLikesMethod('hands'),
            'marking' => $this->getUserAssetLikesMethod('marking'),
        ];
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
        $skinsCount = DB::table('skins')->where('isPublic', '=', 1)->count();

        return $skinsCount;
    }
}
