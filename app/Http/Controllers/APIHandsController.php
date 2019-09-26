<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIHandsController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $hands =
            DB::table("hands")
                ->join('users', 'users.id', '=', 'hands.userID')
                ->where("hands.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('hands.*, users.name as username')
                ->get();

        foreach ($hands as $_hands) {
            unset($_hands->isPublic);
            unset($_hands->userID);
        }

        return response()->json($hands);
    }
}
