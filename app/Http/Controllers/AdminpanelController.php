<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class AdminpanelController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index() {
        return view('pages/admin/home')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
