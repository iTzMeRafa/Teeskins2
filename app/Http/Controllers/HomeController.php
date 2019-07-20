<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends GlobalController
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    /*public function __construct()
    {
        $this->middleware('auth');
    } */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('pages/home')->with("data", $this->getViewData());
    }

    private function getNewestAsset() {
        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("isPublic", "=", 1)
            ->orderBy("uploadDate")
            ->selectRaw('skins.*, users.name as username')
            ->first();
    }

    private function getMostDownloadedAsset() {
        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("isPublic", "=", 1)
            ->orderByDesc("downloads")
            ->selectRaw('skins.*, users.name as username')
            ->first();
    }

    private function getMostLikedAsset() {
        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("isPublic", "=", 1)
            ->orderByDesc("likes")
            ->selectRaw('skins.*, users.name as username')
            ->first();
    }

    private function getViewData() {
        $viewData = [
            'viewData' =>  [
                'mostDownloadedAsset' => $this->getMostDownloadedAsset(),
                'mostLikedAsset' => $this->getMostLikedAsset(),
                'newestAsset' => $this->getNewestAsset(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
