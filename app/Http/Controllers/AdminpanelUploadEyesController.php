<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadEyesController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/eyesUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedEyes(Request $request) {
        $tableType = 'eyes.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $eyes = DB::table("eyes")
            ->join('users', 'users.id', '=', 'eyes.userID')
            ->where("eyes.isPublic", "=", 0)
            ->whereNotIn('eyes.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('eyes.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($eyes as $eye) {
            $eye->assetType = "eyes";
        }

        return $eyes;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Eyes
        $defaultEyesRequest = new Request();
        $defaultEyesRequest->setMethod('POST');
        $defaultEyesRequest->request->add(['excludes' => '' ]);
        $defaultEyesRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'eyes' => $this->getUnverifiedEyes($defaultEyesRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadEyes',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

