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

    public function  getPatientPhq9ScrDetail() 
    {
        $ScrQuery = DB::select(DB::raw( "SELECT ptUUID as uuid, question1 as littleInterestOrPleasureInDoingThings, question2 as feelingDownDepressedOrHopeless, question3 as troubleFallingOrStayingAsleep, question4 as feelingTiredOrHavingLittleEnergy, question5 as poorAppetiteOrOvereating, question6 as feelingBadAboutYourself, question7 as troubleConcentratingOnThings, question8 as movingOrSpeakingSoSlowly, question9 as thoughtsThatYouWouldBeBetterOffDead, question10 as ifYouCheckedOffAnyProblems,  recordChangedByUUID, recordChangedFromIPAddress, UNIX_TIMESTAMP(row_start) AS ROW_START, UNIX_TIMESTAMP(row_end) AS ROW_END FROM sc_scr.phq9PtResponses FOR SYSTEM_TIME ALL where 1"));
        return response()->json($ScrQuery);
    }

    public function setPatientPhq9ScrDetail(Request $request) 
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

    public function showOneScreening($id)
    {
        return response()->json(Screening::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $uuid = Uuid::uuid4();

        $ScrData = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'description' => $requestData['data']['description'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $Screening = Screening::insertGetId($ScrData);

        $channel = 'MsgFromSktForScrToAdd';
        $message = array(
            'uuid' => $uuid,
            'description' => $requestData['data']['description'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $Screening = Screening::create($request->all());
        return response()->json($Screening, 201);
    }

    public function update($id, Request $request)
    {
        $Screening = Screening::findOrFail($id);
        $Screening->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForScrToChange';
        $message = array(
            'uuid' => $id,
            'description' => $requestData['description'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Screening, 200);
    }

    public function delete($id)
    {
        Screening::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

    public function discontinue($id, Request $request)
    {
        $Scrinder = Screening::findOrFail($id);
        $requestData = $request->all();

        if(isset($requestData['dNotes']) && !empty($requestData['dNotes']))
        {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Screening->update($updateData);
        }

        $Screening->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForScrToDiscontinue';
        $message = array(
            'uuid' => $id,
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Discontinued successfully', 200);
    }
}