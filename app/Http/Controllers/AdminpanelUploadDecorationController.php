<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadDecorationController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/decorationUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedDecoration(Request $request) {
        $tableType = 'decoration.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $decoration = DB::table("decoration")
            ->join('users', 'users.id', '=', 'decoration.userID')
            ->where("decoration.isPublic", "=", 0)
            ->whereNotIn('decoration.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('decoration.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($decoration as $_decoration) {
            $_decoration->assetType = "decoration";
        }

        return $decoration;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Decoration
        $defaultDecorationRequest = new Request();
        $defaultDecorationRequest->setMethod('POST');
        $defaultDecorationRequest->request->add(['excludes' => '' ]);
        $defaultDecorationRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'decoration' => $this->getUnverifiedDecoration($defaultDecorationRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadDecoration',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

