<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class DownloadsController extends Controller
{
    public function index($assetType, $assetID) {
        DB::table('downloads')->insert(
            ['assetType' => $assetType, 'assetID' => $assetID, 'date' => NOW()]
        );
    }
}
