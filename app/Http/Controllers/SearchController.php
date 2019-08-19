<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends GlobalController
{
    private $query;
    private $sortType;
    private $excludes;
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($query, $sortType = 'id')
    {
        $this->query = $query;
        $this->sortType = $sortType;
        return view('pages/search')->with('data', $this->getViewData());
    }

    public function fetchSkinsFromDatabase(Request $request) {
        $tableType = 'skins.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where([
                ['skins.name', 'like', '%' . $request->queryString . '%'],
                ['skins.isPublic', '=', 1]
            ])
            ->whereNotIn('skins.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('skins.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();
    }

    private function countTotalSkins() {
        return DB::table("skins")
            ->where([
                ['name', 'like', '%' . $this->query . '%'],
                ['isPublic', '=', 1]
            ])
            ->count();
    }

    private function getViewData() {

        // Create default Request for fetching Skins
        $defaultSkinRequest = new Request();
        $defaultSkinRequest->setMethod('POST');
        $defaultSkinRequest->request->add(['excludes' => '']);
        $defaultSkinRequest->request->add(['type' => $this->sortType]);
        $defaultSkinRequest->request->add(['queryString' => $this->query]);

        $viewData = [
            'viewData' =>  [
                'skins' => $this->fetchSkinsFromDatabase($defaultSkinRequest),
                'countSkins' => $this->countTotalSkins(),
                'query' => $this->query,
                'sortType' => $this->sortType,
                'page' => 'search',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
