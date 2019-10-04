<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadGridsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/gridsUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedGrids(Request $request) {
        $tableType = 'grids.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $grids = DB::table("grids")
            ->join('users', 'users.id', '=', 'grids.userID')
            ->where("grids.isPublic", "=", 0)
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
            'viewData' => [
                'grids' => $this->getUnverifiedGrids($defaultGridsRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadGrids',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

