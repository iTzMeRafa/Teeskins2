<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DownloadsController extends Controller
{
    public function index($assetType, $assetID) {
        if (DB::table('downloads')->insert(['assetType' => $assetType, 'assetID' => $assetID, 'date' => NOW()])) {

            switch ($assetType) {

                case "skin":
                    DB::table('skins')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "body":
                    DB::table('body')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "decoration":
                    DB::table('decoration')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "eyes":
                    DB::table('eyes')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "feet":
                    DB::table('feet')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "hands":
                    DB::table('hands')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "marking":
                    DB::table('marking')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "mapres":
                    DB::table('mapres')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "gameskins":
                    DB::table('gameskins')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "emoticons":
                    DB::table('emoticons')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "cursors":
                    DB::table('cursors')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "particles":
                    DB::table('particles')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "grids":
                    DB::table('grids')->where('id' , '=', $assetID)->increment('downloads');
                    break;

            }
        }
    }
}
