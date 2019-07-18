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
        return DB::table("skins")->where("isPublic", "=", 1)->orderByDesc("uploadDate")->first();
    }

    private function getMostDownloadedAsset() {
        return DB::table("skins")->where("isPublic", "=", 1)->orderByDesc("downloads")->first();
    }

    private function getMostLikedAsset() {
        return DB::table("skins")->where("isPublic", "=", 1)->orderByDesc("likes")->first();
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
