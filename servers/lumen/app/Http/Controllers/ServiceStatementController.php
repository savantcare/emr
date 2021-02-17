<?php

namespace App\Http\Controllers;

use App\ServiceStatement;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class ServiceStatementController extends Controller
{
    public function get_all_temporal_service_statements($pPtUuid)
    {
        $serviceStatementQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_service_statements.service_statements FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($serviceStatementQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $serviceStatementData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'total_minutes_in_psychotherapy' => $requestData['data']['total_minutes_in_psychotherapy'],
            'total_minutes_with_patient' => $requestData['data']['total_minutes_with_patient'],
            'modality_of_psychotherapy_multi_select' => $requestData['data']['modality_of_psychotherapy_multi_select'],
            'optional_multi_select' => $requestData['data']['optional_multi_select'],
            'review_of_systems_multi_select' => $requestData['data']['review_of_systems_multi_select'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $serviceStatement = ServiceStatement::insertGetId($serviceStatementData);

        $channel = 'MsgFromSktForServiceStatementToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'total_minutes_in_psychotherapy' => $requestData['data']['total_minutes_in_psychotherapy'],
            'total_minutes_with_patient' => $requestData['data']['total_minutes_with_patient'],
            'modality_of_psychotherapy_multi_select' => $requestData['data']['modality_of_psychotherapy_multi_select'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $serviceStatement = ServiceStatement::create($request->all());
        return response()->json($serviceStatement, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $serviceStatement = ServiceStatement::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();
        $serviceStatement->update($requestData['data']);

        /**
         * Send data to socket
         */
        /*$requestData = $pRequest->all();
        $channel = 'MsgFromSktForServiceStatementToChange';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'total_minutes_in_psychotherapy' => $requestData['data']['total_minutes_in_psychotherapy'],
            'total_minutes_with_patient' => $requestData['data']['total_minutes_with_patient'],
            'modality_of_psychotherapy_multi_select' => $requestData['data']['modality_of_psychotherapy_multi_select'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

        return response()->json($serviceStatement, 200);
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
