<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class UploadController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        return view('pages/upload')->with("data", $this->getViewData());
    }

    public function uploadAsset(Request $request) {
        print_r($request->all());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
