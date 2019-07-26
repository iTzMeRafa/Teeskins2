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

    public function assetName($assetName) {
        $countAssetName = DB::table('skins')->where('name', '=', $assetName)->count();

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
