<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadSkinsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }
    
    public function index() {
        return view('pages/admin/skinsUpload')->with('data', $this->getViewData());
    }

    private function getUnverifiedSkins() {
        return DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("isPublic", "=", 0)
            ->orderBy("id")
            ->selectRaw('skins.*, users.name as username')
            ->get();
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'skins' => $this->getUnverifiedSkins(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

