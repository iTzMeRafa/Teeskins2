<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIFeetController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $feet =
            DB::table("feet")
                ->join('users', 'users.id', '=', 'feet.userID')
                ->where("feet.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('feet.*, users.name as username')
                ->get();

        foreach ($feet as $_feet) {
            unset($_feet->isPublic);
            unset($_feet->userID);
        }

        return response()->json($feet);
    }
}
