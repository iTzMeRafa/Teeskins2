<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIGridsController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $grids =
            DB::table("grids")
                ->join('users', 'users.id', '=', 'grids.userID')
                ->where("grids.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('grids.*, users.name as username')
                ->get();

        foreach ($grids as $_grids) {
            unset($_grids->isPublic);
            unset($_grids->userID);
        }

        return response()->json($grids);
    }
}
