<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIEmoticonsController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $emoticons =
            DB::table("emoticons")
                ->join('users', 'users.id', '=', 'emoticons.userID')
                ->where("emoticons.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('emoticons.*, users.name as username')
                ->get();

        foreach ($emoticons as $_emoticons) {
            unset($_emoticons->isPublic);
            unset($_emoticons->userID);
        }

        return response()->json($emoticons);
    }
}
