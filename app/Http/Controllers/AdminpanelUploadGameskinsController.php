<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadGameskinsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/gameskinsUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedGameskins(Request $request) {
        $tableType = 'gameskins.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $gameskins = DB::table("gameskins")
            ->join('users', 'users.id', '=', 'gameskins.userID')
            ->where("gameskins.isPublic", "=", 0)
            ->whereNotIn('gameskins.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('gameskins.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($gameskins as $_gameskins) {
            $_gameskins->assetType = "gameskins";
        }

        return $gameskins;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Gameskins
        $defaultGameskinsRequest = new Request();
        $defaultGameskinsRequest->setMethod('POST');
        $defaultGameskinsRequest->request->add(['excludes' => '' ]);
        $defaultGameskinsRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'gameskins' => $this->getUnverifiedGameskins($defaultGameskinsRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadGameskins',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

