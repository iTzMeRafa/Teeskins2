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
        return [
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("skins"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiSkins')),
                'apiURL' => URL::route('apiSkins'),
                'headline' => 'Skins API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("body"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiBody')),
                'apiURL' => URL::route('apiBody'),
                'headline' => 'Body API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("decoration"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiDecoration')),
                'apiURL' => URL::route('apiDecoration'),
                'headline' => 'Decoration API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("eyes"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiEyes')),
                'apiURL' => URL::route('apiEyes'),
                'headline' => 'Eyes API',
                'fetchType' => 'GET / CURL',
            ],
           [
                'exampleJSONResponse' => $this->getExampleJSONResponse("feet"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiFeet')),
                'apiURL' => URL::route('apiFeet'),
                'headline' => 'Feet API',
               'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("hands"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiHands')),
                'apiURL' => URL::route('apiHands'),
                'headline' => 'Hands API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("marking"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiMarking')),
                'apiURL' => URL::route('apiMarking'),
                'headline' => 'Marking API',
                'fetchType' => 'GET / CURL',
            ],

            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("mapres"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiMapres')),
                'apiURL' => URL::route('apiMapres'),
                'headline' => 'Mapres API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("gameskins"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiGameskins')),
                'apiURL' => URL::route('apiGameskins'),
                'headline' => 'Gameskins API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("emoticons"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiEmoticons')),
                'apiURL' => URL::route('apiEmoticons'),
                'headline' => 'Emoticons API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("cursors"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiCursors')),
                'apiURL' => URL::route('apiCursors'),
                'headline' => 'Cursors API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("particles"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiParticles')),
                'apiURL' => URL::route('apiParticles'),
                'headline' => 'Particles API',
                'fetchType' => 'GET / CURL',
            ],
            [
                'exampleJSONResponse' => $this->getExampleJSONResponse("grids"),
                'apiHTTPStatusCode' => $this->getHTTPStatusCodeFromUrl(URL::route('apiGrids')),
                'apiURL' => URL::route('apiGrids'),
                'headline' => 'Grids API',
                'fetchType' => 'GET / CURL',
            ],
        ];
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
