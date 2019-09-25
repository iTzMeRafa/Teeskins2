<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index($assetType, $assetID) {
        if (DB::table('likes')->insert(['assetType' => $assetType, 'assetID' => $assetID, 'userID' => Auth::id(), 'date' => NOW()])) {

            switch ($assetType) {

                case "skin":
                    DB::table('skins')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "body":
                    DB::table('body')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "decoration":
                    DB::table('decoration')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "eyes":
                    DB::table('eyes')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "feet":
                    DB::table('feet')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "hands":
                    DB::table('hands')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "marking":
                    DB::table('marking')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "mapres":
                    DB::table('mapres')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "gameskin":
                    DB::table('gameskins')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "emoticon":
                    DB::table('emoticons')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "particle":
                    DB::table('particles')->where('id' , '=', $assetID)->increment('likes');
                    break;

                case "cursor":
                    DB::table('cursors')->where('id' , '=', $assetID)->increment('likes');
                    break;
            }

        }
    }
}
