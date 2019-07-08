<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GlobalController extends Controller
{
    protected function getGlobalPageData()
    {
        return [
            'totalItemsCount' => $this->getTotalItemsCount(),
            'userInfo' => $this->getUserInfo(),
        ];
    }

    private function getUserInfo() {
        return [
            'isLoggedIn' => Auth::check(),
            'id' => Auth::id(),
            'email' => Auth::check() ? Auth::user()->email : null,
            'username' => Auth::check() ? Auth::user()->name : null,
        ];
    }

    private function getTotalItemsCount() {
        $skinsCount = DB::table('skins')->count();

        return $skinsCount;
    }
}
