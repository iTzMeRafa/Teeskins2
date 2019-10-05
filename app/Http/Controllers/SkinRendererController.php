<?php

namespace App\Http\Controllers;

class SkinRendererController extends GlobalController
{

    public function index() {
        return view('pages/skinrenderer')->with("data", $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
