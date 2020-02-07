<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AssetController;

class AdminpanelAssetController extends GlobalController
{
    private $sortType;
    private $_assetType;
    private $assetController;

    public function __construct()
    {
        $this->middleware('adminAuth');
        $this->assetController = new AssetController();
    }

    public function index($assetType, $sortType = 'uploadDate') {
        $this->sortType = $sortType;
        $this->_assetTypes = $assetType;
        return view('pages/admin/'.$assetType)->with('data', $this->getViewData($assetType));
    }

    public function getUnverifiedFirstAssets($assetType) {
        $asset = $this->assetController->fetchFirstAssets($assetType, $this->sortType, '', 0);
        return $asset;
    }

    public function getUnverifiedAsset($assetType, Request $request) {
        return $this->assetController->fetchAssetsFromDatabase($assetType, $request, 0);
    }

    private function getViewData($assetType) {

        $viewData = [
            'viewData' => [
                $assetType => $this->getUnverifiedFirstAssets($assetType),
                'sortType' => $this->sortType,
                'page' => 'admin'.$this->_assetType,
                'assetUploadsCount' => $this->getAssetUploadsCount(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

