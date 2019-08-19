<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadSkinsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }
    
    public function index($sortType = 'id') {
        return view('pages/admin/skinsUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedSkins(Request $request) {
        $tableType = 'skins.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("skins.isPublic", "=", 0)
            ->whereNotIn('skins.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('skins.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Skins
        $defaultSkinRequest = new Request();
        $defaultSkinRequest->setMethod('POST');
        $defaultSkinRequest->request->add(['excludes' => '' ]);
        $defaultSkinRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'skins' => $this->getUnverifiedSkins($defaultSkinRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadSkins',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

