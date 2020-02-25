<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Intervention\Image\ImageManagerStatic as Image;

class DownloadsController extends GlobalController
{

    public function download($assetType, $assetID, $greyscale) {

        // User has to wait for next download | Time: $this->downloadableAwaitTimeInMinutes
        if (!$this->checkIfAuthorizedForDownload($assetType, $assetID)) {
            return response('Not Authorized For Download', 299);
        }

        $this->increment($assetType, $assetID);
        return $this->downloadAsset($assetType, $assetID, $greyscale);
    }

    private function checkIfAuthorizedForDownload($assetType, $assetID) {
        $userLastDownload = DB::table('downloads')
            ->where([
                ['ip', '=', $this->getUserIpAddress()],
                ['assetType', '=', $assetType],
                ['assetID', '=', $assetID]
            ])
            ->orderByDesc('date')
            ->first();

        if (
            !$userLastDownload ||  // If there was never a download with users ip
            strtotime($userLastDownload->date) < strtotime("-{$this->downloadableAwaitTimeInMinutes} minutes") // If users last download is older (smaller in unix time) than (currenttime-awaitTime)
        ) {
            return true;
        }
        return false;
    }

    private function downloadAsset($assetType, $assetID, $greyscale) {

        $imageResult = DB::table($assetType)->where('id', '=', $assetID)->first();
        $imagePath = $imageResult->imagePath;

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
