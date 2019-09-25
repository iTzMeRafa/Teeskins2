<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BodyController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/body')->with("data", $this->getViewData($sortType));
    }

    public function fetchBodyFromDatabase(Request $request) {
        $tableType = 'body.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $body = DB::table("body")
            ->join('users', 'users.id', '=', 'body.userID')
            ->where("body.isPublic", "=", 1)
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
            'viewData' =>  [
                'body' => $this->fetchBodyFromDatabase($defaultBodyRequest),
                'sortType' => $sortType,
                'page' => 'body',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
