<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;

class DownloadsController extends Controller
{
    public function increment($assetType, $assetID) {
        if (DB::table('downloads')->insert(['assetType' => $assetType, 'assetID' => $assetID, 'date' => NOW()])) {

            DB::table($assetType)->where('id' , '=', $assetID)->increment('downloads');
        }
    }

    public function download($assetType, $assetID, $greyscale) {
        $imageResult = DB::table($assetType)->where('id', '=', $assetID)->first();
        $imagePath = $imageResult->imagePath;
        $imageName = $imageResult->name;

        if (filter_var($greyscale, FILTER_VALIDATE_BOOLEAN)) {
            $img = Image::make(url($imagePath))->greyscale();
            // TODO: Set file name $imageName__greyscale
            // TODO: Bild nimmt den namen vom letzten url parameter wieso auch immer: Wäre ein fix aber meh lieber über Headers setzten
            return $img->response('png');
        }

        return redirect($imagePath);
    }
}
