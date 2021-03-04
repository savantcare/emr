<?php

namespace App\Http\Controllers;

use App\MedicalReviewOfSystem;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class MedicalReviewOfSystemController extends Controller
{
    public function get_all_temporal_medical_review_of_system($pPtUuid)
    {
        $medicalReviewOfSystemQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_medical_review_of_system.medical_review_of_system FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'"  order by ROW_START desc'));
        return response()->json($medicalReviewOfSystemQueryResultObj);
        // return response()->json(MedicalReviewOfSystem::all());
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $medicalReviewOfSystemData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'constitutional_systems_select' => $requestData['data']['constitutional_systems_select'],
            'skin_conditions_select' => $requestData['data']['skin_conditions_select'],
            'allergies_select' => $requestData['data']['allergies_select'],
            'ear_nose_mouth_throat_select' => $requestData['data']['ear_nose_mouth_throat_select'],
            'eyes_head_select' => $requestData['data']['eyes_head_select'],
            'respiratory_select' => $requestData['data']['respiratory_select'],
            'cardiovascular_select' => $requestData['data']['cardiovascular_select'],
            'gastrointestinal_select' => $requestData['data']['gastrointestinal_select'],
            'urinary_select' => $requestData['data']['urinary_select'],
            'endocrine_select' => $requestData['data']['endocrine_select'],
            'musculoskeletal_select' => $requestData['data']['musculoskeletal_select'],
            'neurological_select' => $requestData['data']['neurological_select'],
            'psychological_select' => $requestData['data']['psychological_select'],
            'heme_lymphatic_select' => $requestData['data']['heme_lymphatic_select'],
            'any_other_signs_symptoms' => $requestData['data']['any_other_signs_symptoms'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $medicalReviewOfSystem = MedicalReviewOfSystem::insertGetId($medicalReviewOfSystemData);

        /*$channel = 'MsgFromSktForMRSToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'description' => $requestData['data']['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

        // $medicalReviewOfSystem = MedicalReviewOfSystem::create($request->all());
        return response()->json($medicalReviewOfSystem, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $medicalReviewOfSystem = MedicalReviewOfSystem::findOrFail($pServerSideRowUuid);
        $medicalReviewOfSystem->update($requestData['data']);

        /**
         * Send data to socket
         */
        /*$requestData = $pRequest->all();
        $channel = 'MsgFromSktForMRSToChange';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'description' => $requestData['data']['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

        return response()->json($medicalReviewOfSystem, 200);
    }

    public function get_client_ip()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        } else {
            $ipaddress = 'UNKNOWN';
        }
        return $ipaddress;
    }
}
