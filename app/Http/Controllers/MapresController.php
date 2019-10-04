<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MapresController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/mapres')->with("data", $this->getViewData($sortType));
    }

    public function fetchMapresFromDatabase(Request $request) {
        $tableType = 'mapres.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $mapres = DB::table("mapres")
            ->join('users', 'users.id', '=', 'mapres.userID')
            ->where("mapres.isPublic", "=", 1)
            ->whereNotIn('mapres.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('mapres.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($mapres as $_mapres) {
            $_mapres->assetType = "mapres";
        }

        return $mapres;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Mapres
        $defaultMapresRequest = new Request();
        $defaultMapresRequest->setMethod('POST');
        $defaultMapresRequest->request->add(['excludes' => '' ]);
        $defaultMapresRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'mapres' => $this->fetchMapresFromDatabase($defaultMapresRequest),
                'sortType' => $sortType,
                'page' => 'mapres',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
