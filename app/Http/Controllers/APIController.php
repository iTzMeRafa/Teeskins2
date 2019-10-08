<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;

class APIController extends GlobalController
{
    public function index() {
        return view('pages/api')->with('data', $this->getViewData());
    }

    private function getApis() {
        $apisData = [];

        foreach ($this->assetTypes as $assetType) {
            $apiData = [
                'exampleJSONResponse' => $this->getExampleJSONResponse($assetType),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('assetApi', ['assetType' => $assetType])),
                'apiURL' => URL::route('assetApi', ['assetType' => $assetType]),
                'headline' => ucfirst($assetType) . ' API',
                'fetchType' => 'GET / CURL',
            ];

            array_push($apisData, $apiData);
        }

        return $apisData;
    }

    private function getExampleJSONResponse($assetType) {
        $asset =
            DB::table($assetType)
                ->join('users', 'users.id', '=', $assetType .'.userID')
                ->where($assetType.".isPublic", "=", 1)
                ->orderByDesc('id')
                ->limit(2)
                ->selectRaw($assetType . '.*, users.name as username')
                ->get();

        foreach ($asset as $_asset) {
            unset($_asset->isPublic);
            unset($_asset->userID);
        }

        return response()->json($asset);
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'apis' => $this->getApis(),
                'page' => 'api',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
