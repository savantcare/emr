<?php

namespace App\Http\Controllers;

use App\Height;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class HeightController extends Controller
{
    public function getAllTemporalHeights()
    {
        $heightQuery = DB::select(DB::raw('SELECT *,round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_body_measurements.height FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($heightQuery);

        // return response()->json(Height::all());
    }

    public function getOneHeight($pServerSideRowUuid)
    {
        return response()->json(Height::find($pServerSideRowUuid));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $uuid = Uuid::uuid4();

        $heightData = array(
            'uuid' => $uuid,
            'ptUuid' => $requestData['data']['ptUuid'],
            'heightInInch' => $requestData['data']['heightInInch'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $Height = Height::insertGetId($heightData);

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForHeightToAdd';
        $message = array(
            'uuid' => $uuid,
            'ptUuid' => $requestData['data']['ptUuid'],
            'heightInInch' => $requestData['data']['heightInInch'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );
        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Height, 201);
    }

    public function update($id, Request $request)
    {
        $Height = Height::findOrFail($id);
        $Height->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForHeightToChange';
        $message = array(
            'uuid' => $id,
            'ptUuid' => $requestData['data']['ptUuid'],
            'heightInInch' => $requestData['data']['heightInInch'],
            'measurementDate' => $requestData['data']['measurementDate'],
            'notes' => $requestData['data']['notes'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Height, 200);
    }

    public function delete($id, Request $request)
    {
        $Height = Height::findOrFail($id);
        $requestData = $request->all();

        if(isset($requestData['dNotes']) && !empty($requestData['dNotes']))
        {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Height->update($updateData);
        }

        $Height->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForRemToDelete';
        $message = array(
            'uuid' => $id,
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Deleted successfully', 200);
    }
}