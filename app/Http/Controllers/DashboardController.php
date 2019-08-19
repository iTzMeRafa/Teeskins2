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
        $tableType = 'skins.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("userID", "=", Auth::user()->id)
            ->whereNotIn('skins.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('skins.*, users.name as username')
            ->limit($this->numberPerLoadage)
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

    private function getViewData($sortType) {

        // Create default Request for fetching Skins
        $defaultSkinRequest = new Request();
        $defaultSkinRequest->setMethod('POST');
        $defaultSkinRequest->request->add(['excludes' => '' ]);
        $defaultSkinRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'assets' => $this->getUserUploads($defaultSkinRequest),
                'statistics' => $this->getUserStatistics(),
                'sortType' => $sortType,
                'page' => 'dashboard',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
