<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadBodyController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/bodyUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedBody(Request $request) {
        $tableType = 'body.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $body = DB::table("body")
            ->join('users', 'users.id', '=', 'body.userID')
            ->where("body.isPublic", "=", 0)
            ->whereNotIn('body.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('body.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($body as $_body) {
            $_body->assetType = "body";
        }

        return $body;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Body
        $defaultBodyRequest = new Request();
        $defaultBodyRequest->setMethod('POST');
        $defaultBodyRequest->request->add(['excludes' => '' ]);
        $defaultBodyRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' => [
                'body' => $this->getUnverifiedBody($defaultBodyRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadBody',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

