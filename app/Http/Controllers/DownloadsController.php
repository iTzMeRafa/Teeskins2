<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;

class DownloadsController extends GlobalController
{

    public function download($assetType, $assetID, $greyscale) {

        $this->increment($assetType, $assetID);

        $imageResult = DB::table($assetType)->where('id', '=', $assetID)->first();
        $imagePath = $imageResult->imagePath;
        $imageName = $imageResult->name;

        if (filter_var($greyscale, FILTER_VALIDATE_BOOLEAN)) {
            $img = Image::make(url($imagePath))->greyscale();
            return $img->response('png');
        }

        return redirect($imagePath);
    }

    private function increment($assetType, $assetID) {
        if (DB::table('downloads')->insert(['assetType' => $assetType, 'assetID' => $assetID, 'ip' => $this->getUserIpAddress(), 'date' => NOW()])) {

            DB::table($assetType)->where('id' , '=', $assetID)->increment('downloads');
        }
    }
}
