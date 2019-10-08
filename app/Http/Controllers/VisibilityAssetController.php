<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class VisibilityAssetController extends Controller
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function setAssetVisible($assetType, $assetID) {

        DB::table($assetType)->where('id' , '=', $assetID)->update(['isPublic' => 1]);

        return "success";
    }

    public function setAssetHide($assetType, $assetID) {

        DB::table($assetType)->where('id' , '=', $assetID)->update(['isPublic' => 0]);

        return "success";
    }
}
