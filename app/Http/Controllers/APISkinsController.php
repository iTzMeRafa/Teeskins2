<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APISkinsController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $skins =
            DB::table("skins")
            ->join('users', 'users.id', '=', 'skins.userID')
            ->where("skins.isPublic", "=", 1)
            ->orderByDesc($sortType)
            ->selectRaw('skins.*, users.name as username')
            ->get();

        foreach ($skins as $skin) {
            unset($skin->isPublic);
            unset($skin->userID);
        }

        return response()->json($skins);
    }
}
