<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index() {
        return view('pages/settings')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
