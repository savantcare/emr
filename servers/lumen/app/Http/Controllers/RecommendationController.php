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
    public function getAllTemporalRecommendations()
    {
        $remQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_recommendations.recommendations FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($remQuery);
        // return response()->json(Recommendation::all());
    }

    public function getOneRecommendation($pServerSideRowUuid)
    {
        return response()->json(Recommendation::find($pServerSideRowUuid));
    }

    
    public function create(Request $request)
    {
        $requestData = $request->all();
        
        $remData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid']
        );
       
        $Recommendation = Recommendation::insertGetId($remData);

        $channel = 'MsgFromSktForRemToAdd';
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'description' => $requestData['data']['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $Recommendation = Recommendation::create($request->all());
        return response()->json($Recommendation, 201);
    }

    public function update($serverSideRowUuid, Request $request)
    {
        $Recommendation = Recommendation::findOrFail($serverSideRowUuid);
        $Recommendation->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForRemToChange';
        $message = array(
            'serverSideRowUuid' => $serverSideRowUuid,
            'description' => $requestData['description'],
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Recommendation, 200);
    }

 
    public function delete($serverSideRowUuid, Request $request)
    {
        $Recommendation = Recommendation::findOrFail($serverSideRowUuid);
        $requestData = $request->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Recommendation->update($updateData);
        }

        $Recommendation->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForRemToDelete';
        $message = array(
            'serverSideRowUuid' => $serverSideRowUuid,
            'client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change' => $requestData['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Deleted successfully', 200);
    }
}
