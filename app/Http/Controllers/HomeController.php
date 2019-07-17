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
        $newestSkin = DB::table("skins")->where("isPublic", "=", 1)->orderByDesc("uploadDate")->first();
        $likes = DB::table("likes")->selectRaw("count(*) as likes")->where('assetID', '=', $newestSkin->id)->first();
        $downloads = DB::table("downloads")->selectRaw("count(*) as downloads")->where('assetID', '=', $newestSkin->id)->first();

        $newestSkin->downloads = $downloads->downloads;
        $newestSkin->likes = $likes->likes;

        return $newestSkin;
    }

    private function getMostDownloadedAsset() {
        $mostDownloads =
            DB::table("downloads")
            ->selectRaw("count(*) as downloads, assetType, assetID")
            ->groupBy(["assetType", "assetID"])
            ->orderByDesc("downloads")
            ->first();

        $downloads = $mostDownloads->downloads;
        $likes = DB::table("likes")->selectRaw("count(*) as likes")->where('assetID', '=', $mostDownloads->assetID)->first();

        switch($mostDownloads->assetType) {
            case "skin":
                $mostDownloads = DB::table("skins")->where("id", "=", $mostDownloads->assetID)->first();
                break;
            case "mapres":
                $mostDownloads = DB::table("mapres")->where("id", "=", $mostDownloads->assetID)->first();
                break;
            case "gameskin":
                $mostDownloads = DB::table("gameskin")->where("id", "=", $mostDownloads->assetID)->first();
                break;
            case "emoticon":
                $mostDownloads = DB::table("emoticon")->where("id", "=", $mostDownloads->assetID)->first();
                break;
            case "particle":
                $mostDownloads = DB::table("particle")->where("id", "=", $mostDownloads->assetID)->first();
                break;
            case "cursor":
                $mostDownloads = DB::table("cursor")->where("id", "=", $mostDownloads->assetID)->first();
                break;
        }
        $mostDownloads->downloads = $downloads;
        $mostDownloads->likes = $likes->likes;
        return $mostDownloads;
    }

    private function getMostLikedAsset() {
        $mostLiked =
            DB::table("likes")
                ->selectRaw("count(*) as likes, assetType, assetID")
                ->groupBy(["assetType", "assetID"])
                ->orderByDesc("likes")
                ->first();

        $likes = $mostLiked->likes;
        $downloads = DB::table("downloads")->selectRaw("count(*) as downloads")->where('assetID', '=', $mostLiked->assetID)->first();

        switch($mostLiked->assetType) {
            case "skin":
                $mostLiked = DB::table("skins")->where("id", "=", $mostLiked->assetID)->first();
                break;
            case "mapres":
                $mostLiked = DB::table("mapres")->where("id", "=", $mostLiked->assetID)->first();
                break;
            case "gameskin":
                $mostLiked = DB::table("gameskin")->where("id", "=", $mostLiked->assetID)->first();
                break;
            case "emoticon":
                $mostLiked = DB::table("emoticon")->where("id", "=", $mostLiked->assetID)->first();
                break;
            case "particle":
                $mostLiked = DB::table("particle")->where("id", "=", $mostLiked->assetID)->first();
                break;
            case "cursor":
                $mostLiked = DB::table("cursor")->where("id", "=", $mostLiked->assetID)->first();
                break;
        }
        $mostLiked->likes = $likes;
        $mostLiked->downloads = $downloads->downloads;
        return $mostLiked;
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
