<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadParticlesController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index($sortType = 'id') {
        return view('pages/admin/particlesUpload')->with('data', $this->getViewData($sortType));
    }

    public function getUnverifiedParticles(Request $request) {
        $tableType = 'particles.'.$request->type;
        $excludesToArray = explode(',', $request->excludes);

        $particles = DB::table("particles")
            ->join('users', 'users.id', '=', 'particles.userID')
            ->where("particles.isPublic", "=", 0)
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
            'viewData' => [
                'particles' => $this->getUnverifiedParticles($defaultParticlesRequest),
                'sortType' => $sortType,
                'page' => 'adminUploadParticles',
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

