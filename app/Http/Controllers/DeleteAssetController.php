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

    // TODO: Also delete Asset in folder, not just database entry
    public function deleteAsset($assetType, $assetID) {
        switch($assetType) {

            case 'skin':
                DB::table('skins')->where('id', '=', $assetID)->delete();
                break;

            case 'body':
                DB::table('body')->where('id', '=', $assetID)->delete();
                break;

            case 'decoration':
                DB::table('decoration')->where('id', '=', $assetID)->delete();
                break;

            case 'eyes':
                DB::table('eyes')->where('id', '=', $assetID)->delete();
                break;

            case 'feet':
                DB::table('feet')->where('id', '=', $assetID)->delete();
                break;

            case 'hands':
                DB::table('hands')->where('id', '=', $assetID)->delete();
                break;

            case 'marking':
                DB::table('marking')->where('id', '=', $assetID)->delete();
                break;

            default:
                return "failed";
        }
        return "success";
    }
}
