<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ReportController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('adminAuth');
    }

    public function index() {
        return view('pages/admin/reports')->with('data', $this->getViewData());
    }

    public function insertReport($assetType, $assetID, $reportResonVal, $reportReasonText) {

        if (DB::table('reports')->insert(
            [
                'userID' => Auth::id(),
                'assetID' => $assetID,
                'assetType' => $assetType,
                'type' => $reportResonVal,
                'message' => $reportReasonText,
                'uploadDate' => NOW()
            ]
        )) {
            return "valid";
        } else {
            return "invalid";
        }
    }

    private function getReports() {
        return DB::table("reports")
            ->join('users', 'users.id', '=', 'reports.userID')
            ->selectRaw('reports.*, users.name as username')
            ->get();
    }

    private function getViewData() {
        $viewData = [
            'viewData' => [
                'reports' => $this->getReports(),
            ],
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
