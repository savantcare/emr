<?php

namespace App\Http\Controllers;

use App\ChiefComplaint;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class ChiefComplaintController extends Controller
{
    public function get_all_temporal_chief_complaint($pPtUuid)
    {
        $chiefComplaintQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_chief_complaint.chief_complaint FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($chiefComplaintQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $chiefComplaintData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $chiefComplaint = ChiefComplaint::insertGetId($chiefComplaintData);

        return response()->json($chiefComplaint, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $chiefComplaint = ChiefComplaint::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();
        $chiefComplaint->update($requestData['data']);

        /**
         * Send data to socket
         */
        /*$requestData = $pRequest->all();
        $channel = 'MsgFromSktForChiefComplaintToChange';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'ChiefComplaintMasterId' => $requestData['ChiefComplaintMasterId'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

        return response()->json($chiefComplaint, 200);
    }

    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $chiefComplaint = ChiefComplaint::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $chiefComplaint->update($updateData);
        }

        $chiefComplaint->delete();

        /**
         * Send data to socket
         */
        /*$channel = 'MsgFromSktForChiefComplaintToDelete';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

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
