<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIDecorationController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $decoration =
            DB::table("decoration")
                ->join('users', 'users.id', '=', 'decoration.userID')
                ->where("decoration.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('decoration.*, users.name as username')
                ->get();

        foreach ($decoration as $_decoration) {
            unset($_decoration->isPublic);
            unset($_decoration->userID);
        }

        return response()->json($decoration);
    }
}
