<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIBodyController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $body =
            DB::table("body")
                ->join('users', 'users.id', '=', 'body.userID')
                ->where("body.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('body.*, users.name as username')
                ->get();

        foreach ($body as $_body) {
            unset($_body->isPublic);
            unset($_body->userID);
        }

        return response()->json($body);
    }
}
