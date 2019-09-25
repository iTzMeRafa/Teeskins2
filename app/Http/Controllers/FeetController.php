<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FeetController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/feet')->with("data", $this->getViewData($sortType));
    }

    public function fetchFeetFromDatabase(Request $request) {
        $tableType = 'feet.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $feet = DB::table("feet")
            ->join('users', 'users.id', '=', 'feet.userID')
            ->where("feet.isPublic", "=", 1)
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
            'viewData' =>  [
                'feet' => $this->fetchFeetFromDatabase($defaultFeetRequest),
                'sortType' => $sortType,
                'page' => 'feet',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
