<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class SkinsController extends GlobalController
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('pages/skins')->with("data", $this->getViewData());
    }

    private function fetchSkinsFromDatabase() {
        $skins = DB::table("skins")->orderBy("id")->get();

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
            'viewData' =>  [
                'skins' => $this->fetchSkinsFromDatabase(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
