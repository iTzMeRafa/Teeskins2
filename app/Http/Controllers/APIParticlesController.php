<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class APIParticlesController extends Controller
{
    public function index($sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $particles =
            DB::table("particles")
                ->join('users', 'users.id', '=', 'particles.userID')
                ->where("particles.isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw('particles.*, users.name as username')
                ->get();

        foreach ($particles as $_particles) {
            unset($_particles->isPublic);
            unset($_particles->userID);
        }

        return response()->json($particles);
    }
}
