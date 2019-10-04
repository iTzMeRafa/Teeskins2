<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIMapresController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $mapres =
            DB::table("mapres")
                ->join('users', 'users.id', '=', 'mapres.userID')
                ->where("mapres.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('mapres.*, users.name as username')
                ->get();

        foreach ($mapres as $_mapres) {
            unset($_mapres->isPublic);
            unset($_mapres->userID);
        }

        return response()->json($mapres);
    }
}
