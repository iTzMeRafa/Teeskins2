<?php

namespace App\Http\Controllers;

class ErrorController extends GlobalController
{
    public function error404() {
        return view('pages/errors/404')->with('data', $this->getViewData());
    }

    public function error500() {
        return view('pages/errors/500')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
