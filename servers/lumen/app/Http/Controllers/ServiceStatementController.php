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
    public function getAllTemporalServiceStatements()
    {
        $ServiceStatementQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_service_statements.service_statements FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($ServiceStatementQuery);
        // return response()->json(ServiceStatement::all());
    }

    public function getOneServiceStatement($pServerSideRowUuid)
    {
        return response()->json(ServiceStatement::find($pServerSideRowUuid));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        
        $serviceStatementData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'serviceStatementFieldIdFromServiceStatementMaster' => $requestData['data']['serviceStatementFieldIdFromServiceStatementMaster'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $ServiceStatement = ServiceStatement::insertGetId($serviceStatementData);

        $channel = 'MsgFromSktForServiceStatementToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'serviceStatementFieldIdFromServiceStatementMaster' => $requestData['data']['serviceStatementFieldIdFromServiceStatementMaster'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $ServiceStatement = ServiceStatement::create($request->all());
        return response()->json($ServiceStatement, 201);
    }

    public function update($id, Request $request)
    {
        $ServiceStatement = ServiceStatement::findOrFail($id);
        $ServiceStatement->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForServiceStatementToChange';
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
        $ServiceStatement = ServiceStatement::findOrFail($id);
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
        $channel = 'MsgFromSktForServiceStatementToDelete';
        $message = array(
            'serverSideRowUuid' => $id,
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Deleted successfully', 200);
    }
}
