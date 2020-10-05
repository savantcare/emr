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
    public function getAllTemporalReminders()
    {
        $remQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM reminders FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($remQuery);
        // return response()->json(Reminder::all());
    }

    public function getOneReminder($pServerSideRowUuid)
    {
        return response()->json(Reminder::find($pServerSideRowUuid));
    }

    /*

    To check postman/post/ URL: http://localhost:8000/public/api/reminders/v20/
    Body / Json
    {"data":{"$id":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01014fb0-c1ef-11ea-a3a5-f36fe4d74da4","description":200,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ptUuid":"1", "clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange":"1"}}
    Wiki has a video on youtube
    */
    public function create(Request $request)
    {
        $requestData = $request->all();
        
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
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $Reminder = Reminder::create($request->all());
        return response()->json($Reminder, 201);
    }

    public function update($serverSideRowUuid, Request $request)
    {
        $Reminder = Reminder::findOrFail($serverSideRowUuid);
        $Reminder->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForRemToChange';
        $message = array(
            'serverSideRowUuid' => $serverSideRowUuid,
            'description' => $requestData['description'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Reminder, 200);
    }

 
    public function delete($id, Request $request)
    {
        $Reminder = Reminder::findOrFail($id);
        $requestData = $request->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Reminder->update($updateData);
        }

        $Reminder->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForRemToDelete';
        $message = array(
            'serverSideRowUuid' => $id,
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Deleted successfully', 200);
    }
}
