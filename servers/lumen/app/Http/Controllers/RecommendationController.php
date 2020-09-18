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

    public function showAllRecommendations()
    {
        $recQuery = DB::select(DB::raw('SELECT *,UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_rec.recs FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($recQuery);
        // return response()->json(Recommendation::all());
    }

    public function showOneRecommendation($id)
    {
        return response()->json(Recommendation::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $uuid = Uuid::uuid4();

        $recData = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'description' => $requestData['data']['description'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $Recommendation = Recommendation::insertGetId($recData);

        $channel = 'MsgFromSktForRecToAdd';
        $message = array(
            'uuid' => $uuid,
            'description' => $requestData['data']['description'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['data']['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        // $Recommendation = Recommendation::create($request->all());
        return response()->json($Recommendation, 201);
    }

    public function update($id, Request $request)
    {
        $Recommendation = Recommendation::findOrFail($id);
        $Recommendation->update($request->all());

        /**
         * Send data to socket
         */
        $requestData = $request->all();
        $channel = 'MsgFromSktForRecToChange';
        $message = array(
            'uuid' => $id,
            'description' => $requestData['description'],
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response()->json($Recommendation, 200);
    }

    public function delete($id)
    {
        Recommendation::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

    public function discontinue($id, Request $request)
    {
        $Recommendation = Recommendation::findOrFail($id);
        $requestData = $request->all();

        if(isset($requestData['dNotes']) && !empty($requestData['dNotes']))
        {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Recommendation->update($updateData);
        }

        $Recommendation->delete();

        /**
         * Send data to socket
         */
        $channel = 'MsgFromSktForRecToDiscontinue';
        $message = array(
            'uuid' => $id,
            'clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange' => $requestData['clientSideSocketIdToPreventDuplicateUIChangeOnClientThatRequestedServerForDataChange']
        );

        $redis = new \Predis\Client();
        $redis->publish($channel, json_encode($message));

        return response('Discontinued successfully', 200);
    }
}