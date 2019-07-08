<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SkinsController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('pages/skins')->with("data", $this->getViewData());
    }

    private function fetchSkinsFromDatabase() {
        $skins = DB::table('skins')->get();
        return $skins;
    }

    private function getViewData() {
        $viewData = [
            'viewData' =>  [
                'skins' => $this->fetchSkinsFromDatabase(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
