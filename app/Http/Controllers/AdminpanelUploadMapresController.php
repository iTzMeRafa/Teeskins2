<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadMapresController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/mapresUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedMapres(Request $request) {
        $tableType = 'mapres.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $mapres = DB::table("mapres")
            ->join('users', 'users.id', '=', 'mapres.userID')
            ->where("mapres.isPublic", "=", 0)
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
            'viewData' => [
                'mapres' => $this->getUnverifiedMapres($defaultMapresRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadMapres',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

