<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIMarkingController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $marking =
            DB::table("marking")
                ->join('users', 'users.id', '=', 'marking.userID')
                ->where("marking.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('marking.*, users.name as username')
                ->get();

        foreach ($marking as $_marking) {
            unset($_marking->isPublic);
            unset($_marking->userID);
        }

        return response()->json($marking);
    }
}
