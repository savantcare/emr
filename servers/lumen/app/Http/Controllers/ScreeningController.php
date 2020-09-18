<?php

namespace App\Http\Controllers;

use App\Screening;
use App\Phq9;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class ScreeningController extends Controller
{

    public function getScreenings($ptUUID)
    {
        $scrPtData = DB::select(DB::raw("SELECT *, UNIX_TIMESTAMP(sc_scr.scrAssignedToPts.ROW_START) as ROW_START, UNIX_TIMESTAMP(sc_scr.scrAssignedToPts.ROW_END) as ROW_END FROM sc_scr.scrAssignedToPts FOR SYSTEM_TIME All where 1"));

        if(empty($scrPtData)) {
            $arOut = array(
                "uuid" => $ptUUID,
            );
            return response()->json($arOut);
        }
        else {
            return response()->json($scrPtData);
        }
    }

    public function setScreenings(Request $request) 
    {
        $requestData = $request->all();
        $scrData = $requestData['data'];

        $scrPtData = array(
            "uuid" => $scrData["uuid"],
            "scrUUID" => $scrData["scrUUID"],
            "ptUUID" => $scrData["ptUUID"],
            "notes" => $scrData["notes"],
            "recordChangedByUUID" => $scrData["recordChangedByUUID"],
            "recordChangedFromIPAddress" => $scrData["recordChangedFromIPAddress"]
        );
        return $screeningId = Screening::insertGetId($scrPtData);

    }

    public function  getScrPhq9($ptUUID) 
    {
        $phq9Data = DB::select(DB::raw( "SELECT ptUUID as uuid, question1 as littleInterestOrPleasureInDoingThings, question2 as feelingDownDepressedOrHopeless, question3 as troubleFallingOrStayingAsleep, question4 as feelingTiredOrHavingLittleEnergy, question5 as poorAppetiteOrOvereating, question6 as feelingBadAboutYourself, question7 as troubleConcentratingOnThings, question8 as movingOrSpeakingSoSlowly, question9 as thoughtsThatYouWouldBeBetterOffDead, question10 as ifYouCheckedOffAnyProblems,  recordChangedByUUID, recordChangedFromIPAddress, UNIX_TIMESTAMP(row_start) AS ROW_START, UNIX_TIMESTAMP(row_end) AS ROW_END FROM sc_scr.phq9PtResponses FOR SYSTEM_TIME ALL where 1"));

        if(empty($phq9Data)) {
            $arOut = array(
                "uuid" => $ptUUID,
            );
            return response()->json($arOut);
        }
        else {
            return response()->json($phq9Data);
        }
    }

    public function setScrPhq9(Request $request) 
    {
        $requestData = $request->all();
        $patientUUID = $requestData['ptUUID'];
        $screeningData = $requestData['data'];
        $scrInfo = ["ptUUID" => $patientUUID];

        for ($i = 1; $i <= 10; $i++) {
            $key = "question" . $i;
            $screeningData[$key] = $screeningData[$key] == "null" ? null : (string) $screeningData[$key];
        }

        $phq9Data = Phq9::find($patientUUID);

        if(empty($phq9Data)) {
            return $phpq9Id = Phq9::insertGetId($screeningData);
        }
        else {
            $patientUUID = $requestData['ptUUID'];
            unset($screeningData['ptUUID']);
            $Screening = Phq9::findOrFail($patientUUID);
            return $Screening->update($screeningData);
        }
    
    }
}