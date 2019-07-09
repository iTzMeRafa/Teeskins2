<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UnlikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($assetType, $assetID) {
        DB::table('likes')->where(
            ['assetType' => $assetType, 'assetID' => $assetID, 'userID' => Auth::id()]
        )->delete();;
    }
}
