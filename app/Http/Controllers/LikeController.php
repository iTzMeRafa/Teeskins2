<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($assetType, $assetID) {
        DB::table('likes')->insert(
            ['assetType' => $assetType, 'assetID' => $assetID, 'date' => NOW()]
        );
    }
}
