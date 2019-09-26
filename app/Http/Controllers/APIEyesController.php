<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIEyesController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $eyes =
            DB::table("eyes")
                ->join('users', 'users.id', '=', 'eyes.userID')
                ->where("eyes.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('eyes.*, users.name as username')
                ->get();

        foreach ($eyes as $_eyes) {
            unset($_eyes->isPublic);
            unset($_eyes->userID);
        }

        return response()->json($eyes);
    }
}
