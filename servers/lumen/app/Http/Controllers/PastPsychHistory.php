<?php

namespace App\Http\Controllers;

use App\PastPyschHistory;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class PastPyschHistoryController extends Controller
{
    public function getAllTemporalPastPyschHistorys()
    {
        $pastPyschHistoryQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_service_statements.service_statements order by ROW_START desc'));
        return response()->json($pastPyschHistoryQueryResultObj);
        // return response()->json(PastPyschHistory::all());
    }

    public function getOnePastPyschHistory($pServerSideRowUuid)
    {
        return response()->json(PastPyschHistory::find($pServerSideRowUuid));
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $pastPyschHistoryData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'patientUuid' => $requestData['data']['patientUuid'],
            'pastPyschHistoryMasterId' => $requestData['data']['pastPyschHistoryMasterId'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );
       
        $PastPyschHistory = PastPyschHistory::insertGetId($pastPyschHistoryData);

        $channel = 'MsgFromSktForPastPyschHistoryToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'pastPyschHistoryMasterId' => $requestData['data']['pastPyschHistoryMasterId'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $PastPyschHistory = PastPyschHistory::create($request->all());
        return response()->json($PastPyschHistory, 201);
    }

    public function update($serverSideRowUuid, Request $request)
    {
        $PastPyschHistory = PastPyschHistory::findOrFail($serverSideRowUuid);
        $PastPyschHistory->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForPastPyschHistoryToChange';
        $message = array(
            'serverSideRowUuid' => $serverSideRowUuid,
            'pastPyschHistoryMasterId' => $requestData['pastPyschHistoryMasterId'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($PastPyschHistory, 200);
    }

 
    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $pastPyschHistory = PastPyschHistory::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $pastPyschHistory->update($updateData);
        }

        $PastPyschHistory->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForPastPyschHistoryToDelete';
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
