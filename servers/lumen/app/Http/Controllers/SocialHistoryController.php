<?php

namespace App\Http\Controllers;

use App\SocialHistory;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class SocialHistoryController extends Controller
{
    public function get_all_temporal_social_histories($pPtUuid)
    {
        $socialHistoryQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_social_history.social_history FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($socialHistoryQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $socialHistoryData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'current_social_situation' => $requestData['data']['current_social_situation'],
            'education_work_history' => $requestData['data']['education_work_history'],
            'social_supports' => $requestData['data']['social_supports'],
            'developmental_history' => $requestData['data']['developmental_history'],
            'trauma_history' => $requestData['data']['trauma_history'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress,
        );

        $socialHistory = SocialHistory::insertGetId($socialHistoryData);

        return response()->json($socialHistory, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $socialHistory = SocialHistory::findOrFail($pServerSideRowUuid);
        $socialHistory->update($requestData['data']);

        return response()->json($socialHistory, 200);
    }
    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $socialHistory = SocialHistory::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'deletedNote' => $requestData['dNotes']
            );
            $socialHistory->update($updateData);
        }

        $socialHistory->delete();
        
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
