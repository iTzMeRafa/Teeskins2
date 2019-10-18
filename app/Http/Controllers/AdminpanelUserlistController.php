<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AdminpanelUserlistController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index() {
        return view('pages/admin/userlist')->with('data', $this->getViewData());
    }

    private function getUserlist() {
        return DB::table("users")->get();
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'userList' => $this->getUserlist(),
                'assetUploadsCount' => $this->getAssetUploadsCount(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
