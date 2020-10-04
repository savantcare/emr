<?php

namespace App\Http\Controllers;

use App\ServiceStatement;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class ReminderController extends Controller
{
    public function showAllReminders()
    {
        $ServiceStatementQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM service_statements FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($ServiceStatementQuery);
        // return response()->json(Reminder::all());
    }

    public function showOneReminder($id)
    {
        return response()->json(Reminder::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        
        $serviceStatementData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'serviceStatementFieldIdFromServiceStatementMaster' => $requestData['data']['serviceStatementFieldIdFromServiceStatementMaster'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $ServiceStatement = Reminder::insertGetId($serviceStatementData);

        $channel = 'MsgFromSktForRemToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'serviceStatementFieldIdFromServiceStatementMaster' => $requestData['data']['serviceStatementFieldIdFromServiceStatementMaster'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $ServiceStatement = Reminder::create($request->all());
        return response()->json($ServiceStatement, 201);
    }

    public function update($id, Request $request)
    {
        $ServiceStatement = Reminder::findOrFail($id);
        $ServiceStatement->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForRemToChange';
        $message = array(
            'serverSideRowUuid' => $id,
            'serviceStatementFieldIdFromServiceStatementMaster' => $requestData['serviceStatementFieldIdFromServiceStatementMaster'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($ServiceStatement, 200);
    }

 
    public function delete($id, Request $request)
    {
        $ServiceStatement = Reminder::findOrFail($id);
        $requestData = $request->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $ServiceStatement->update($updateData);
        }

        $ServiceStatement->delete();

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
