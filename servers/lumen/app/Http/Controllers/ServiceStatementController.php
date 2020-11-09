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
    public function get_all_temporal_service_statements()
    {
        $serviceStatementQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_service_statements.service_statements order by ROW_START desc'));
        return response()->json($serviceStatementQueryResultObj);
        // return response()->json(ServiceStatement::all());
    }

    public function get_one_service_statement($pServerSideRowUuid)
    {
        return response()->json(ServiceStatement::find($pServerSideRowUuid));
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $serviceStatementData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'patientUuid' => $requestData['data']['patientUuid'],
            'total_minutes_in_psychotherapy_select' => $requestData['data']['total_minutes_in_psychotherapy_select'],
            'total_minutes_with_patient_select' => $requestData['data']['total_minutes_with_patient_select'],
            'modality_of_psychotherapy_multi_select' => $requestData['data']['modality_of_psychotherapy_multi_select'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $ServiceStatement = ServiceStatement::insertGetId($serviceStatementData);

        $channel = 'MsgFromSktForServiceStatementToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'total_minutes_in_psychotherapy_select' => $requestData['data']['total_minutes_in_psychotherapy_select'],
            'total_minutes_with_patient_select' => $requestData['data']['total_minutes_with_patient_select'],
            'modality_of_psychotherapy_multi_select' => $requestData['data']['modality_of_psychotherapy_multi_select'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $ServiceStatement = ServiceStatement::create($request->all());
        return response()->json($ServiceStatement, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $ServiceStatement = ServiceStatement::findOrFail($pServerSideRowUuid);
        $ServiceStatement->update($pRequest->all());

        /**
         * Send data to socket
         */
        $requestData = $pRequest->all();
        $channel = 'MsgFromSktForServiceStatementToChange';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'total_minutes_in_psychotherapy_select' => $requestData['total_minutes_in_psychotherapy_select'],
            'total_minutes_with_patient_select' => $requestData['total_minutes_with_patient_select'],
            'modality_of_psychotherapy_multi_select' => $requestData['modality_of_psychotherapy_multi_select'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($ServiceStatement, 200);
    }

    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $serviceStatement = ServiceStatement::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $serviceStatement->update($updateData);
        }

        $serviceStatement->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForServiceStatementToDelete';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

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
