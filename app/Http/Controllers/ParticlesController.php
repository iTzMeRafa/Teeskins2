<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ParticlesController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index($sortType = 'id')
    {
        return view('pages/particles')->with("data", $this->getViewData($sortType));
    }

    public function fetchParticlesFromDatabase(Request $request) {
        $tableType = 'particles.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $particles = DB::table("particles")
            ->join('users', 'users.id', '=', 'particles.userID')
            ->where("particles.isPublic", "=", 1)
            ->whereNotIn('particles.id', $excludesToArray)
            ->orderByDesc($tableType)
            ->selectRaw('particles.*, users.name as username')
            ->limit($this->numberPerLoadage)
            ->get();

        foreach ($particles as $_particles) {
            $_particles->assetType = "particles";
        }

        return $particles;
    }

    private function getViewData($sortType) {

        // Create default Request for fetching Particles
        $defaultParticlesRequest = new Request();
        $defaultParticlesRequest->setMethod('POST');
        $defaultParticlesRequest->request->add(['excludes' => '' ]);
        $defaultParticlesRequest->request->add(['type' => $sortType]);

        $viewData = [
            'viewData' =>  [
                'particles' => $this->fetchParticlesFromDatabase($defaultParticlesRequest),
                'sortType' => $sortType,
                'page' => 'particles',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
