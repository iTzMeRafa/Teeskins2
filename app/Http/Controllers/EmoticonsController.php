<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmoticonsController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/emoticons')->with("data", $this->getViewData($sortType));
    }

    public function fetchEmoticonsFromDatabase(Request $request) {
        $tableType = 'emoticons.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $emoticons = DB::table("emoticons")
            ->join('users', 'users.id', '=', 'emoticons.userID')
            ->where("emoticons.isPublic", "=", 1)
            ->whereNotIn('emoticons.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('emoticons.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($emoticons as $_emoticons) {
            $_emoticons->assetType = "emoticons";
        }

        return $emoticons;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Emoticons
        $defaultEmoticonsRequest = new Request();
        $defaultEmoticonsRequest->setMethod('POST');
        $defaultEmoticonsRequest->request->add(['excludes' => '' ]);
        $defaultEmoticonsRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'emoticons' => $this->fetchEmoticonsFromDatabase($defaultEmoticonsRequest),
                'sortType' => $sortType,
                'page' => 'emoticons',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
