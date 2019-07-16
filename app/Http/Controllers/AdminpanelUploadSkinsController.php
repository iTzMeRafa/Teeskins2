<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminpanelUploadSkinsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }
    
    public function index() {
        return view('pages/admin/skinsUpload')->with('data', $this->getViewData());
    }

    private function getUnverifiedSkins() {
        $skins = DB::table("skins")->where("isPublic", "=", 0)->orderBy("id")->get();

        $downloads = 
            DB::table("downloads")
            ->selectRaw("assetID, count(*) as downloads")
            ->where("assetType", "=", "skin")
            ->groupBy(["assetType", "assetID"])
            ->orderBy("assetID")
            ->get();

        $likes = 
            DB::table("likes")
            ->selectRaw("assetID, count(*) as likes")
            ->where("assetType", "=", "skin")
            ->groupBy(["assetType", "assetID"])
            ->orderBy("assetID")
            ->get();
        
        
        foreach ($skins as $key => $skin) {
            $skin->downloads = 0;
            $skin->likes = 0;
            
            // Find and assert downloads to skin
            foreach ($downloads as $download) {
               if ($skin->id === $download->assetID) {
                   $skin->downloads = $download->downloads;
                   break;
               }
            }

            // Find and assert likes to skin
            foreach ($likes as $like) {
                if ($skin->id === $like->assetID) {
                    $skin->likes = $like->likes;
                    break;
                }
            }
        }
        return $skins;
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'skins' => $this->getUnverifiedSkins(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}

