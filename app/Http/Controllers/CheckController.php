<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CheckController extends Controller
{
    public function username($username) {
        $countUsername = DB::table('users')->where('name', '=', $username)->count();

        if ($countUsername == 0) {
            return "valid";
        }
        else {
            return "invalid";
        }
    }

    public function assetName($assetName, $assetType) {
        switch ($assetType) {

            case "skin":
                $countAssetName = DB::table('skins')->where('name', '=', $assetName)->count();
                break;

            case "body":
                $countAssetName = DB::table('body')->where('name', '=', $assetName)->count();
                break;

            case "decoration":
                $countAssetName = DB::table('decoration')->where('name', '=', $assetName)->count();
                break;

            case "eyes":
                $countAssetName = DB::table('eyes')->where('name', '=', $assetName)->count();
                break;

            case "feet":
                $countAssetName = DB::table('feet')->where('name', '=', $assetName)->count();
                break;

            case "hands":
                $countAssetName = DB::table('hands')->where('name', '=', $assetName)->count();
                break;

            case "marking":
                $countAssetName = DB::table('marking')->where('name', '=', $assetName)->count();
                break;

            case "mapres":
                $countAssetName = DB::table('mapres')->where('name', '=', $assetName)->count();
                break;

            case "gameskins":
                $countAssetName = DB::table('gameskins')->where('name', '=', $assetName)->count();
                break;

            case "emoticons":
                $countAssetName = DB::table('emoticons')->where('name', '=', $assetName)->count();
                break;

            case "cursors":
                $countAssetName = DB::table('cursors')->where('name', '=', $assetName)->count();
                break;

            case "particles":
                $countAssetName = DB::table('particles')->where('name', '=', $assetName)->count();
                break;

            case "grids":
                $countAssetName = DB::table('grids')->where('name', '=', $assetName)->count();
                break;

            default:
                $countAssetName = 0;
                break;
        }

        if ($countAssetName == 0) {
            return "valid";
        }
        else {
            return "invalid";
        }
    }

    public function email($email) {
        $countEmail = DB::table('users')->where('email', '=', $email)->count();

        if ($countEmail == 0) {
            return "valid";
        }
        else {
            return "invalid";
        }
    }
}
