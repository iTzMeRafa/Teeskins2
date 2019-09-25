<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SkinsController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/skins')->with("data", $this->getViewData($sortType));
    }

    public function fetchSkinsFromDatabase(Request $request) {
        $tableType = 'skins.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $skins = DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("skins.isPublic", "=", 1)
            ->whereNotIn('skins.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('skins.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($skins as $skin) {
            $skin->assetType = 'skin';
        }

        return $skins;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Skins
        $defaultSkinRequest = new Request();
        $defaultSkinRequest->setMethod('POST');
        $defaultSkinRequest->request->add(['excludes' => '' ]);
        $defaultSkinRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'skins' => $this->fetchSkinsFromDatabase($defaultSkinRequest),
                'sortType' => $sortType,
                'page' => 'skins',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
