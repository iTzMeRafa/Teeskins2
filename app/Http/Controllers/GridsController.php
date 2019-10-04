<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GridsController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/grids')->with("data", $this->getViewData($sortType));
    }

    public function fetchGridsFromDatabase(Request $request) {
        $tableType = 'grids.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $grids = DB::table("grids")
            ->join('users', 'users.id', '=', 'grids.userID')
            ->where("grids.isPublic", "=", 1)
            ->whereNotIn('grids.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('grids.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($grids as $_grids) {
            $_grids->assetType = "grids";
        }

        return $grids;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Grids
        $defaultGridsRequest = new Request();
        $defaultGridsRequest->setMethod('POST');
        $defaultGridsRequest->request->add(['excludes' => '' ]);
        $defaultGridsRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'grids' => $this->fetchGridsFromDatabase($defaultGridsRequest),
                'sortType' => $sortType,
                'page' => 'grids',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
