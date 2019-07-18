<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SearchController extends GlobalController
{
    private $query;
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($query)
    {
        $this->query = $query;
        return view('pages/search')->with('data', $this->getViewData());
    }

    private function fetchSkinsFromDatabase() {
        return DB::table('skins')->where('name', 'like', '%' . $this->query . '%')->orWhere('author', 'like', '%' . $this->query . '%')->orderBy('id')->get();
    }

    private function getViewData() {
        $viewData = [
            'viewData' =>  [
                'skins' => $this->fetchSkinsFromDatabase(),
                'query' => $this->query,
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
