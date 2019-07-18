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

                case "mapres":
                    DB::table('mapres')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "gameskin":
                    DB::table('gameskins')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "emoticon":
                    DB::table('emoticons')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "particle":
                    DB::table('particles')->where('id' , '=', $assetID)->increment('downloads');
                    break;

                case "cursor":
                    DB::table('cursors')->where('id' , '=', $assetID)->increment('downloads');
                    break;
            }
        }
    }
}
