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
        if (DB::table('likes')->where(['assetType' => $assetType, 'assetID' => $assetID, 'userID' => Auth::id()])->delete()) {

            switch ($assetType) {

                case "skin":
                    DB::table('skins')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "mapres":
                    DB::table('mapres')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "gameskin":
                    DB::table('gameskins')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "emoticon":
                    DB::table('emoticons')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "particle":
                    DB::table('particles')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "cursor":
                    DB::table('cursors')->where('id' , '=', $assetID)->decrement('likes');
                    break;
            }

        }
    }
}
