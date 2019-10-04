<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIGameskinsController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $gameskins =
            DB::table("gameskins")
                ->join('users', 'users.id', '=', 'gameskins.userID')
                ->where("gameskins.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('gameskins.*, users.name as username')
                ->get();

        foreach ($gameskins as $_gameskins) {
            unset($_gameskins->isPublic);
            unset($_gameskins->userID);
        }

        return response()->json($gameskins);
    }
}
