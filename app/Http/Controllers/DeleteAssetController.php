<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class DeleteAssetController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    // TODO: Also delete Asset in folder, not just database entry
    public function deleteAsset($assetType, $assetID) {

        DB::table($assetType)->where('id', '=', $assetID)->delete();

        return "success";
    }
}
