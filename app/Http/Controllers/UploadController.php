<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UploadController extends GlobalController
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index() {
        return view('pages/upload')->with("data", $this->getViewData());
    }

    public function uploadAsset(Request $request) {

        $validation     = $this->validate($request,
        [
          'name' => 'required|max:255',
          'assetType' => 'required',
          'author' => 'required',
          'file' => 'required|image|mimes:png|max:10240',
        ],[
          'name.unique' => 'This Category already exists.'
        ]);

        if ($validation && $request->hasFile('file') && $request->file('file')->isValid()) {

            $uniqueID = DB::table('skins')->max('id') + 1;
            $name = $request->name;
            $assetType = $request->assetType;
            $author = $request->author;
            $file = $request->file;
            $fileExtension = $file->extension();
            $fileName = $uniqueID . '_' . $name . '.' . $fileExtension;

            switch ($assetType) {
                case "skin":
                    if(Storage::disk('skins')->put($fileName, file_get_contents($file))) {
                        DB::table('skins')->insert(
                            ['name' => $name, 'author' => $author, 'imagePath' => '/database/skins/' . $fileName ,'userID' => Auth::id(), 'isPublic' => 0, 'uploadDate' => NOW()]
                        );
                    }
                    break;
                default:
                    return "failed";
            }

            return "success";
        } 
        else {
            return "failed";
        }
    }

    private function getViewData() {
        $viewData = [
            'globalData' => $this->getGlobalPageData(),
        ];

        return json_encode($viewData);
    }
}
