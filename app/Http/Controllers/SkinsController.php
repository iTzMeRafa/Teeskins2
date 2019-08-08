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

    public function fetchSkinsFromDatabase($offset = 999999) { // 'Hack' to start at highest skins id (newest), when no offset is set
        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where([
                ["isPublic", "=", 1],
                ["skins.id", "<", $offset],
            ])
            ->orderByDesc("id")
            ->selectRaw('skins.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();
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
