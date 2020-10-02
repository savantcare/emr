<?php
namespace App\Http\Controllers;
use App\Phq9;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class Phq9Controller extends Controller
{
    public function  showAllPhq9Screen() 
    {
        $phq9Data = DB::select(DB::raw('SELECT serverSideRowUuid, ptUUID as patientUUID, questionUUID as phq9QuestionMasterId,  answerValue as optionValueChosenByPatient, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_scr.phq9PtResponses FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($phq9Data);
    }

    public function showOnePhq9Screen($screenUUID) {
        // .. in progress
    }

    public function create(Request $request) 
    {
        // .. in progress

    }

    public function update($screenUUID) 
    {
        // .. in progress
    }
} 