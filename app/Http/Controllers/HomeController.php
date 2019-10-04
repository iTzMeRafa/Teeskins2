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
        $trendingArray = [
            "skin"        => $this->getTrendingAsset('skins', 'uploadDate'),
            "body"        => $this->getTrendingAsset('body', 'uploadDate'),
            "decoration"  => $this->getTrendingAsset('decoration', 'uploadDate'),
            "eyes"        => $this->getTrendingAsset('eyes', 'uploadDate'),
            "feet"        => $this->getTrendingAsset('feet', 'uploadDate'),
            "hands"       => $this->getTrendingAsset('hands', 'uploadDate'),
            "marking"     => $this->getTrendingAsset('marking', 'uploadDate'),
            "mapres"      => $this->getTrendingAsset('mapres', 'uploadDate'),
            "gameskins"   => $this->getTrendingAsset('gameskins', 'uploadDate'),
            "emoticons"   => $this->getTrendingAsset('emoticons', 'uploadDate'),
            "cursors"     => $this->getTrendingAsset('cursors', 'uploadDate'),
            "particles"   => $this->getTrendingAsset('particles', 'uploadDate'),
            "grids"       => $this->getTrendingAsset('grids', 'uploadDate'),
        ];

        $uploadDateArray = [
            "skin"        => $trendingArray["skin"]->uploadDate,
            "body"        => $trendingArray["body"]->uploadDate,
            "decoration"  => $trendingArray["decoration"]->uploadDate,
            "eyes"        => $trendingArray["eyes"]->uploadDate,
            "feet"        => $trendingArray["feet"]->uploadDate,
            "hands"       => $trendingArray["hands"]->uploadDate,
            "marking"     => $trendingArray["marking"]->uploadDate,
            "mapres"      => $trendingArray["mapres"]->uploadDate,
            "gameskins"   => $trendingArray["gameskins"]->uploadDate,
            "emoticons"   => $trendingArray["emoticons"]->uploadDate,
            "cursors"     => $trendingArray["cursors"]->uploadDate,
            "particles"   => $trendingArray["particles"]->uploadDate,
            "grids"       => $trendingArray["grids"]->uploadDate,
        ];

        $newestAsset = array_keys($uploadDateArray, max($uploadDateArray));
        $trendingArray[$newestAsset[0]]->assetType = $newestAsset[0];
        return $trendingArray[$newestAsset[0]];
    }

    private function getMostDownloadedAsset() {
        $trendingArray = [
            "skin"        => $this->getTrendingAsset('skins', 'downloads'),
            "body"        => $this->getTrendingAsset('body', 'downloads'),
            "decoration"  => $this->getTrendingAsset('decoration', 'downloads'),
            "eyes"        => $this->getTrendingAsset('eyes', 'downloads'),
            "feet"        => $this->getTrendingAsset('feet', 'downloads'),
            "hands"       => $this->getTrendingAsset('hands', 'downloads'),
            "marking"     => $this->getTrendingAsset('marking', 'downloads'),
            "mapres"      => $this->getTrendingAsset('mapres', 'downloads'),
            "gameskins"   => $this->getTrendingAsset('gameskins', 'downloads'),
            "emoticons"   => $this->getTrendingAsset('emoticons', 'downloads'),
            "cursors"     => $this->getTrendingAsset('cursors', 'downloads'),
            "particles"   => $this->getTrendingAsset('particles', 'downloads'),
            "grids"       => $this->getTrendingAsset('grids', 'downloads'),
        ];

        $downloadsArray = [
            "skin"        => $trendingArray["skin"]->downloads,
            "body"        => $trendingArray["body"]->downloads,
            "decoration"  => $trendingArray["decoration"]->downloads,
            "eyes"        => $trendingArray["eyes"]->downloads,
            "feet"        => $trendingArray["feet"]->downloads,
            "hands"       => $trendingArray["hands"]->downloads,
            "marking"     => $trendingArray["marking"]->downloads,
            "mapres"      => $trendingArray["mapres"]->downloads,
            "gameskins"   => $trendingArray["gameskins"]->downloads,
            "emoticons"   => $trendingArray["emoticons"]->downloads,
            "cursors"     => $trendingArray["cursors"]->downloads,
            "particles"   => $trendingArray["particles"]->downloads,
            "grids"       => $trendingArray["grids"]->downloads,
        ];

        $newestAsset = array_keys($downloadsArray, max($downloadsArray));
        $trendingArray[$newestAsset[0]]->assetType = $newestAsset[0];
        return $trendingArray[$newestAsset[0]];
    }

    private function getMostLikedAsset() {
        $trendingArray = [
            "skin"        => $this->getTrendingAsset('skins', 'likes'),
            "body"        => $this->getTrendingAsset('body', 'likes'),
            "decoration"  => $this->getTrendingAsset('decoration', 'likes'),
            "eyes"        => $this->getTrendingAsset('eyes', 'likes'),
            "feet"        => $this->getTrendingAsset('feet', 'likes'),
            "hands"       => $this->getTrendingAsset('hands', 'likes'),
            "marking"     => $this->getTrendingAsset('marking', 'likes'),
            "mapres"      => $this->getTrendingAsset('mapres', 'likes'),
            "gameskins"   => $this->getTrendingAsset('gameskins', 'likes'),
            "emoticons"   => $this->getTrendingAsset('emoticons', 'likes'),
            "cursors"     => $this->getTrendingAsset('cursors', 'likes'),
            "particles"   => $this->getTrendingAsset('particles', 'likes'),
            "grids"       => $this->getTrendingAsset('grids', 'likes'),
        ];

        $likesArray = [
            "skin"        => $trendingArray["skin"]->likes,
            "body"        => $trendingArray["body"]->likes,
            "decoration"  => $trendingArray["decoration"]->likes,
            "eyes"        => $trendingArray["eyes"]->likes,
            "feet"        => $trendingArray["feet"]->likes,
            "hands"       => $trendingArray["hands"]->likes,
            "marking"     => $trendingArray["marking"]->likes,
            "mapres"      => $trendingArray["mapres"]->likes,
            "gameskins"   => $trendingArray["gameskins"]->likes,
            "emoticons"   => $trendingArray["emoticons"]->likes,
            "cursors"     => $trendingArray["cursors"]->likes,
            "particles"   => $trendingArray["particles"]->likes,
            "grids"       => $trendingArray["grids"]->likes,
        ];

        $newestAsset = array_keys($likesArray, max($likesArray));
        $trendingArray[$newestAsset[0]]->assetType = $newestAsset[0];
        return $trendingArray[$newestAsset[0]];
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
