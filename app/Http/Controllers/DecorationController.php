<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DecorationController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/decoration')->with("data", $this->getViewData($sortType));
    }

    public function fetchDecorationFromDatabase(Request $request) {
        $tableType = 'decoration.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $decoration = DB::table("decoration")
            ->join('users', 'users.id', '=', 'decoration.userID')
            ->where("decoration.isPublic", "=", 1)
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
            'viewData' =>  [
                'decoration' => $this->fetchDecorationFromDatabase($defaultDecorationRequest),
                'sortType' => $sortType,
                'page' => 'decoration',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
