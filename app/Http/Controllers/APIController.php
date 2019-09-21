<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIController extends GlobalController
{
    public function index() {
        return view('pages/api')->with('data', $this->getViewData());
    }

    private function getExampleSkinJSONResponse() {
        $skins =
            DB::table("skins")
                ->join('users', 'users.id', '=', 'skins.userID')
                ->where("skins.isPublic", "=", 1)
                ->orderByDesc('id')
                ->limit(2)
                ->selectRaw('skins.*, users.name as username')
                ->get();

        foreach ($skins as $skin) {
            unset($skin->isPublic);
            unset($skin->userID);
        }

        return response()->json($skins);
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'exampleJSONResponse' => $this->getExampleSkinJSONResponse(),
                'page' => 'api',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
