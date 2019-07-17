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
        switch($assetType) {
            case 'skin':
                DB::table('skins')
                ->where('id' , '=', $assetID)
                ->update(['isPublic' => 1]);
                break;
            default:
                return "failed";
        }
        return "success";
        
    }

    public function setAssetHide($assetType, $assetID) {
        switch($assetType) {
            case 'skin':
                DB::table('skins')
                ->where('id' , '=', $assetID)
                ->update(['isPublic' => 0]);
                break;
            default:
                return "failed";
        }
        return "success";
    }
}
