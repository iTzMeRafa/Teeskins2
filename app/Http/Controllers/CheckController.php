<?php

namespace App\Http\Controllers;

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

        $countAssetName = DB::table($assetType)->where('name', '=', $assetName)->count();

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
