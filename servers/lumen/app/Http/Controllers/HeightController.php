<?php

namespace App\Http\Controllers;

use App\Height;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class HeightController extends Controller
{
    public function showAllHeights()
    {
        $heightQuery = DB::select(DB::raw('SELECT *,UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.height FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($heightQuery);

        // return response()->json(Height::all());
    }

    public function showOneHeight($id)
    {
        return response()->json(Height::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $heightData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'heightInInches' => $requestData['data']['heightInInches'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $heightObj = Height::insertGetId($heightData);

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForHeightToAdd';
        $socketID = (isset($requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange'])) ? $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange'] : null;
        $message = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'heightInInches' => $requestData['data']['heightInInches'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $socketID
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($heightObj, 201);
    }

    public function update($id, Request $request)
    {
        $heightObj = Height::findOrFail($id);
        $heightObj->update($request->all());

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForHeightToChange';
        $requestData = $request->all();
        $socketID = (isset($requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange'])) ? $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange'] : null;

        $message = array(
            'serverSideRowUuid' => $id,
            'heightInInches' => $requestData['heightInInches'],
            'timeOfMeasurement' => $requestData['timeOfMeasurement'],
            'notes' => $requestData['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $socketID
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($heightObj, 200);
    }

}