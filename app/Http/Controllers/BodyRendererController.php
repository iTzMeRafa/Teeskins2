<?php

namespace App\Http\Controllers;

class BodyRendererController extends GlobalController
{

    public function index() {
        return view('pages/bodyrenderer')->with("data", $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
