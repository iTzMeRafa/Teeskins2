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
                DB::table('skins')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'body':
                DB::table('body')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'decoration':
                DB::table('decoration')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'eyes':
                DB::table('eyes')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'feet':
                DB::table('feet')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'hands':
                DB::table('hands')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'marking':
                DB::table('marking')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'mapres':
                DB::table('mapres')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'gameskins':
                DB::table('gameskins')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'emoticons':
                DB::table('emoticons')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'cursors':
                DB::table('cursors')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'particles':
                DB::table('particles')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            case 'grids':
                DB::table('grids')->where('id' , '=', $assetID)->update(['isPublic' => 1]);
                break;

            default:
                return "failed";
        }
        return "success";
        
    }

    public function setAssetHide($assetType, $assetID) {
        switch($assetType) {

            case 'skin':
                DB::table('skins')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'body':
                DB::table('body')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'decoration':
                DB::table('decoration')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'eyes':
                DB::table('eyes')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'feet':
                DB::table('feet')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'hands':
                DB::table('hands')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'marking':
                DB::table('marking')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'mapres':
                DB::table('mapres')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'gameskins':
                DB::table('gameskins')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'emoticons':
                DB::table('emoticons')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'cursors':
                DB::table('cursors')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'particles':
                DB::table('particles')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            case 'grids':
                DB::table('grids')->where('id' , '=', $assetID)->update(['isPublic' => 0]);
                break;

            default:
                return "failed";
        }
        return "success";
    }
}
