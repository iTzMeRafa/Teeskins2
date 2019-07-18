<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index() {
        return view('pages/dashboard')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
