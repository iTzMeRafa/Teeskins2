<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GlobalController extends Controller
{
    protected function getGlobalPageData()
    {
        return [
            'totalItemsCount' => $this->getTotalItemsCount(),
            'userInfo' => $this->getUserInfo(),
        ];
    }

    private function getUserInfo() {
        return [
            'isLoggedIn' => Auth::check(),
            'id' => Auth::id(),
            'email' => Auth::check() ? Auth::user()->email : null,
            'username' => Auth::check() ? Auth::user()->name : null,
            'assetLikes' => $this->getUserAssetLikes(),
        ];
    }

    private function getUserAssetLikes() {
        return [
            'skins' => $this->getUserSkinLikes(),
        ];
    }

    private function getUserSkinLikes() {
        if (!Auth::check()) {
            return;
        }

        $skinLikes =  
            DB::table('likes')
            ->select('assetID')
            ->where([
                ['assetType', '=', 'skin'], 
                ['userID', '=', Auth::id()]
            ])
            ->distinct()
            ->get();
        
        $likes = [];
        foreach ($skinLikes as $key => $skinLike) {
            $likes[$key] = $skinLike->assetID;
        }
        return $likes;
    }

    private function getTotalItemsCount() {
        $skinsCount = DB::table('skins')->count();

        return $skinsCount;
    }
}
