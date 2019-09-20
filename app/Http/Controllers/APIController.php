<?php

namespace App\Http\Controllers;


class APIController extends GlobalController
{
    public function index() {
        return view('pages/api')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
