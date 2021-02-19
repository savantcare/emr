<?php

namespace App\Http\Controllers;

use App\MedicalHistory;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class MedicalHistoryController extends Controller
{
    public function get_all_temporal_medical_histories($pPtUuid)
    {
        $medicalHistoryQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_medical_history.medical_history FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($medicalHistoryQueryResultObj);
    }

    public function get_one_medical_history($pServerSideRowUuid)
    {
        return response()->json(MedicalHistory::find($pServerSideRowUuid));
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $medicalHistoryData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'diagnosis' => $requestData['data']['diagnosis'],
            'description' => $requestData['data']['description'],
            'priority' => $requestData['data']['priority'],
            'isAutoRem' => $requestData['data']['isAutoRem'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress,
        );

        $medicalHistory = MedicalHistory::insertGetId($medicalHistoryData);

        return response()->json($medicalHistory, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $medicalHistory = MedicalHistory::findOrFail($pServerSideRowUuid);
        $medicalHistory->update($requestData['data']);

        return response()->json($medicalHistory, 200);
    }
    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $medicalHistory = MedicalHistory::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'deletedNote' => $requestData['dNotes']
            );
            $medicalHistory->update($updateData);
        }

        $medicalHistory->delete();
        
        return response('Deleted successfully', 200);
    }
    public function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }
}
