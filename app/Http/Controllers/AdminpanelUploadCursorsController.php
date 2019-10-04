<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadCursorsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/cursorsUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedCursors(Request $request) {
        $tableType = 'cursors.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $cursors = DB::table("cursors")
            ->join('users', 'users.id', '=', 'cursors.userID')
            ->where("cursors.isPublic", "=", 0)
            ->whereNotIn('cursors.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('cursors.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($cursors as $_cursors) {
            $_cursors->assetType = "cursors";
        }

        return $cursors;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Cursors
        $defaultCursorsRequest = new Request();
        $defaultCursorsRequest->setMethod('POST');
        $defaultCursorsRequest->request->add(['excludes' => '' ]);
        $defaultCursorsRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'cursors' => $this->getUnverifiedCursors($defaultCursorsRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadCursors',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

