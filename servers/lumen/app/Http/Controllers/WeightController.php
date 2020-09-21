<?php

namespace App\Http\Controllers;

use App\Weight;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class WeightController extends Controller
{
    public function showAllWeights()
    {
        $weightQuery = DB::select(DB::raw('SELECT *,uuid as serverSideRowUuid, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.weight FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($weightQuery);
    }

    public function showOneWeight($id)
    {
        return response()->json(Weight::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $uuid = Uuid::uuid4();

        $weightData = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'weightInPounds' => $requestData['data']['weightInPounds'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $weightObj = Weight::insertGetId($weightData);

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForWeightToAdd';
        $message = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'weightInPounds' => $requestData['data']['weightInPounds'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($weightObj, 201);
    }

    public function update($id, Request $request)
    {
        $weightObj = Weight::findOrFail($id);
        $weightObj->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForWeightToChange';
        $message = array(
            'uuid' => $id,
            'weightInPounds' => $requestData['weightInPounds'],
            'timeOfMeasurement' => $requestData['timeOfMeasurement'],
            'notes' => $requestData['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($weightObj, 200);
    }

}