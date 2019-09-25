<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadMarkingController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/markingUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedMarking(Request $request) {
        $tableType = 'marking.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $marking = DB::table("marking")
            ->join('users', 'users.id', '=', 'marking.userID')
            ->where("marking.isPublic", "=", 0)
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
            'viewData' => [
                'marking' => $this->getUnverifiedMarking($defaultMarkingRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadMarking',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

