<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SettingsController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    public function index() {
        return view('pages/settings')->with('data', $this->getViewData());
    }

    public function updateUsername($username) {
        $countUsername = DB::table('users')->where('name', '=', $username)->count();

        if (
            empty($username) ||
            strlen($username) == 0 ||
            strlen($username) > 255 ||
            $countUsername != 0
        ) {
            return "invalid";
        }

        if (DB::table('users')->where('id', '=', Auth::user()->id)->update(['name' => $username])) {
            return "valid";
        }
        
        return "invalid";
    }

    public function updateEmail($email) {
    
        $countEmail = DB::table('users')->where('email', '=', $email)->count();

        if (
            empty($email) ||
            strlen($email) < 5 ||
            strlen($email) > 255 ||
            $countEmail != 0
        ) {
            return "invalid";
        }

        if (DB::table('users')->where('id', '=', Auth::user()->id)->update(['email' => $email])) {
            return "valid";
        }
        
        return "invalid";
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
