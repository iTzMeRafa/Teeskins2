<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class GlobalController extends Controller
{
    protected function getGlobalPageData()
    {
        return [
            'totalItemsCount' => $this->getTotalItemsCount(),
        ];
    }

    private function getTotalItemsCount() {
        $skinsCount = DB::table('skins')->count();

        return $skinsCount;
    }
}
