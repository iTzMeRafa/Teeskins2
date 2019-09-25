<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MarkingController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/marking')->with("data", $this->getViewData($sortType));
    }

    public function fetchMarkingFromDatabase(Request $request) {
        $tableType = 'marking.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $marking = DB::table("marking")
            ->join('users', 'users.id', '=', 'marking.userID')
            ->where("marking.isPublic", "=", 1)
            ->whereNotIn('marking.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('marking.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($marking as $_marking) {
            $_marking->assetType = "marking";
        }

        return $marking;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Marking
        $defaultMarkingRequest = new Request();
        $defaultMarkingRequest->setMethod('POST');
        $defaultMarkingRequest->request->add(['excludes' => '' ]);
        $defaultMarkingRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'marking' => $this->fetchMarkingFromDatabase($defaultMarkingRequest),
                'sortType' => $sortType,
                'page' => 'marking',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
