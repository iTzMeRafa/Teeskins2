<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APICursorsController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $cursors =
            DB::table("cursors")
                ->join('users', 'users.id', '=', 'cursors.userID')
                ->where("cursors.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('cursors.*, users.name as username')
                ->get();

        foreach ($cursors as $_cursors) {
            unset($_cursors->isPublic);
            unset($_cursors->userID);
        }

        return response()->json($cursors);
    }
}
