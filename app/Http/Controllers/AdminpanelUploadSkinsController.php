<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminpanelUploadSkinsController extends GlobalController
{
    public function index() {
        return view('pages/admin/skinsUpload')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

