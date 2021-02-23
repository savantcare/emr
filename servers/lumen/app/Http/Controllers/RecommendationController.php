<?php

namespace App\Http\Controllers;

use App\Recommendation;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class RecommendationController extends Controller
{
    public function get_all_temporal_recommendations($pPtUuid)
    {
        $remQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_recommendations.recommendations FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'"  order by ROW_START desc'));
        return response()->json($remQueryResultObj);
        // return response()->json(Recommendation::all());
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $remData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $recommendation = Recommendation::insertGetId($remData);

        /*$channel = 'MsgFromSktForRemToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'description' => $requestData['data']['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

        // $recommendation = Recommendation::create($request->all());
        return response()->json($recommendation, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recommendation = Recommendation::findOrFail($pServerSideRowUuid);
        $recommendation->update($requestData['data']);

        /**
         * Send data to socket
         */
        /*$requestData = $pRequest->all();
        $channel = 'MsgFromSktForRemToChange';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'description' => $requestData['data']['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));*/

        return response()->json($recommendation, 200);
    }

    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $recommendation = Recommendation::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $recommendation->update($updateData);
        }

        $recommendation->delete();

        /**
         * Send data to socket
         */
        /*$channel = 'MsgFromSktForRemToDelete';
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
