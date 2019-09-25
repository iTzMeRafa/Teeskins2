<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HandsController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/hands')->with("data", $this->getViewData($sortType));
    }

    public function fetchHandsFromDatabase(Request $request) {
        $tableType = 'hands.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $hands = DB::table("hands")
            ->join('users', 'users.id', '=', 'hands.userID')
            ->where("hands.isPublic", "=", 1)
            ->whereNotIn('hands.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('hands.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($hands as $hand) {
            $hand->assetType = "hands";
        }

        return $hands;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Hands
        $defaultHandsRequest = new Request();
        $defaultHandsRequest->setMethod('POST');
        $defaultHandsRequest->request->add(['excludes' => '' ]);
        $defaultHandsRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'hands' => $this->fetchHandsFromDatabase($defaultHandsRequest),
                'sortType' => $sortType,
                'page' => 'hands',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
