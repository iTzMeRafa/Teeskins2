<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class DeleteAssetController extends Controller
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function deleteAsset($assetType, $assetID) {
        switch($assetType) {
            case 'skin':
                DB::table('skins')->where('id', '=', $assetID)->delete();
                break;
            default:
                return "failed";
        }
        return "success";
    }
}
