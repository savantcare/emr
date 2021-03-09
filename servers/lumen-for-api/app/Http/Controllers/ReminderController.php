<?php

namespace App\Http\Controllers;

use App\Reminder;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class ReminderController extends Controller
{
    public function get_all_temporal_reminders($pPtUuid)
    {
        $remQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM reminders FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'"  order by ROW_START desc'));
        return response()->json($remQueryResultObj);
        // return response()->json(Reminder::all());
    }

    /*
    To check postman/post/ URL: http://localhost:8000/public/api/reminders/v20/
    Body / Json
    {"data":{"$serverSideRowUuid":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01014fb0-c1ef-11ea-a3a5-f36fe4d74da4","description":200,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ptUuid":"1", "client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change":"1"}}
    Wiki has a video on youtube
    */
    public function create(Request $pRequest){
    	 $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $data = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'notes' => $requestData['data']['notes'],
            'priority' => $requestData['data']['priority'],
            'isAutoRem' => $requestData['data']['isAutoRem'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress,
            'recordChangedFromSection' => $requestData['data']['recordChangedFromSection'],
        );

        $returnData = Reminder::insertGetId($data);

        return response()->json($returnData, 201);
        /*$requestData = $pRequest->all();
        $remData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid']
        );
        $Reminder = Reminder::insertGetId($remData);
        $channel = 'MsgFromSktForRemToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'description' => $requestData['data']['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));
        // $Reminder = Reminder::create($request->all());
        return response()->json($Reminder, 201);*/
    }

    public function update($pServerSideRowUuid, Request $pRequest){
    	$requestData = $pRequest->all();
        $data = Reminder::findOrFail($pServerSideRowUuid);
        $data->update($requestData['data']);

        return response()->json($data, 200);
       /* $Reminder = Reminder::findOrFail($pServerSideRowUuid);
        $Reminder->update($pRequest->all());
        
         // Send data to socket
         
        $requestData = $pRequest->all();
        $channel = 'MsgFromSktForRemToChange';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'description' => $requestData['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));
        return response()->json($Reminder, 200);*/
    }

    public function delete($pServerSideRowUuid, Request $pRequest){
    	
    	$rowData = Reminder::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $rowData->update($updateData);
        }

        $rowData->delete();

        return response('Deleted successfully', 200);
    	
        /*$Reminder = Reminder::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();
        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Reminder->update($updateData);
        }
        $Reminder->delete();
        
         // Send data to socket
         
        $channel = 'MsgFromSktForRemToDelete';
        $message = array(
            'serverSideRowUuid' => $pServerSideRowUuid,
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));
        return response('Deleted successfully', 200);*/
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