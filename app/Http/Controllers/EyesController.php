<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EyesController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/eyes')->with("data", $this->getViewData($sortType));
    }

    public function fetchEyesFromDatabase(Request $request) {
        $tableType = 'eyes.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $eyes = DB::table("eyes")
            ->join('users', 'users.id', '=', 'eyes.userID')
            ->where("eyes.isPublic", "=", 1)
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
            'viewData' =>  [
                'eyes' => $this->fetchEyesFromDatabase($defaultEyesRequest),
                'sortType' => $sortType,
                'page' => 'eyes',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
