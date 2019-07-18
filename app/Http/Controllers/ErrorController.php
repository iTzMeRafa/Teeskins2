<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ErrorController extends GlobalController
{
    public function error404() {
        return view('pages/errors/404')->with('data', $this->getViewData());
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
