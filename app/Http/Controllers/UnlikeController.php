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

                case "body":
                    DB::table('body')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "decoration":
                    DB::table('decoration')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "eyes":
                    DB::table('eyes')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "feet":
                    DB::table('feet')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "hands":
                    DB::table('hands')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "marking":
                    DB::table('marking')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "mapres":
                    DB::table('mapres')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "gameskins":
                    DB::table('gameskins')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "emoticons":
                    DB::table('emoticons')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "cursors":
                    DB::table('cursors')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "particles":
                    DB::table('particles')->where('id' , '=', $assetID)->decrement('likes');
                    break;

                case "grids":
                    DB::table('grids')->where('id' , '=', $assetID)->decrement('likes');
                    break;


            }

        }
    }
}
