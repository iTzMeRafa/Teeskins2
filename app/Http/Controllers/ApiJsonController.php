<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class ApiJsonController extends Controller
{
    public function index($assetType, $sortType = 'id') {

        $allowedSortType = ['id', 'downloads', 'likes'];

        if (!in_array($sortType, $allowedSortType)) {
            return redirect()->route('error404');
        }

        $asset =
            DB::table($assetType)
                ->join('users', 'users.id', '=', $assetType . '.userID')
                ->where($assetType . ".isPublic", "=", 1)
                ->orderByDesc($sortType)
                ->selectRaw($assetType . '.*, users.name as username')
                ->get();

        foreach ($asset as $_asset) {
            unset($_asset->isPublic);
            unset($_asset->userID);
        }

        return response()->json($asset);
    }
}
