<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadFeetController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/feetUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedFeet(Request $request) {
        $tableType = 'feet.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $feet = DB::table("feet")
            ->join('users', 'users.id', '=', 'feet.userID')
            ->where("feet.isPublic", "=", 0)
            ->whereNotIn('feet.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('feet.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($feet as $_feet) {
            $_feet->assetType = "feet";
        }

        return $feet;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Feet
        $defaultFeetRequest = new Request();
        $defaultFeetRequest->setMethod('POST');
        $defaultFeetRequest->request->add(['excludes' => '' ]);
        $defaultFeetRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'feet' => $this->getUnverifiedFeet($defaultFeetRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadFeet',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

