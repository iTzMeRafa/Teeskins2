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
    
    public function index() {
        return view('pages/dashboard')->with('data', $this->getViewData());
    }

    private function getUserUploads() {
        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("userID", "=", Auth::user()->id)
            ->orderBy("uploadDate")
            ->selectRaw('skins.*, users.name as username')
            ->get();
    }

    private function getUserStatistics() {
        $uploadCount = DB::table("skins")->where("userID", "=", Auth::user()->id)->orderBy("uploadDate")->count();
        $totalLikes = DB::table("skins")->where("userID", "=", Auth::user()->id)->sum('likes');
        $totalDownloads = DB::table("skins")->where("userID", "=", Auth::user()->id)->sum('downloads');

        return [
            'uploadCount' => $uploadCount,
            'totalLikes' => $totalLikes,
            'totalDownloads' => $totalDownloads,
        ];
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'assets' => $this->getUserUploads(),
                'statistics' => $this->getUserStatistics(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
