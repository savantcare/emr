<?php

namespace App\Http\Controllers;

use App\PastPsychHistory;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class PastPsychHistoryController extends Controller
{
    public function getAllTemporalPastPsychHistory()
    {
        $pastPsychHistoryQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_past_psych_history.patient_data
        order by ROW_START desc'));
        return response()->json($pastPsychHistoryQueryResultObj);
        // return response()->json(PastPsychHistory::all());
    }

    public function getOnePastPsychHistory($pServerSideRowUuid)
    {
        return response()->json(PastPsychHistory::find($pServerSideRowUuid));
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $pastPsychHistoryData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'past_outpatient_treatment' => $requestData['data']['past_outpatient_treatment'],
            'past_meds_trials' => $requestData['data']['past_meds_trials'],
            'hospitalization' => $requestData['data']['hospitalization'],
            'history_of_violence' => $requestData['data']['history_of_violence'],
            'history_of_self_harm' => $requestData['data']['history_of_self_harm'],
            'past_substance_abuse' => $requestData['data']['past_substance_abuse'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $PastPsychHistory = PastPsychHistory::insertGetId($pastPsychHistoryData);

        return response()->json($PastPsychHistory, 201);
    }

    public function update($serverSideRowUuid, Request $request)
    {
        $PastPsychHistory = PastPsychHistory::findOrFail($serverSideRowUuid);
        $PastPsychHistory->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForPastPsychHistoryToChange';
        $message = array(
            'serverSideRowUuid' => $serverSideRowUuid,
            'pastPsychHistoryMasterId' => $requestData['pastPsychHistoryMasterId'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($PastPsychHistory, 200);
    }


    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $pastPsychHistory = PastPsychHistory::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $pastPsychHistory->update($updateData);
        }

        $PastPsychHistory->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForPastPsychHistoryToDelete';
        $message = array(
            'serverSideRowUuid' => $serverSideRowUuid,
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Deleted successfully', 200);
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
