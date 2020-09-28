<?php

namespace App\Http\Controllers;

use App\Pulse;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class PulseController extends Controller
{
    public function showAllPulses()
    {
        $pulseQuery = DB::select(DB::raw('SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.pulse FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($pulseQuery);
    }

    public function showOnePulse($id)
    {
        return response()->json(Pulse::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $pulseData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'pulseInBpm' => $requestData['data']['pulseInBpm'],
            'timeOfMeasurement' => $requestData['data']['timeOfMeasurement'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );

        $pulseObj = Pulse::insertGetId($pulseData);

        return response()->json($pulseObj, 201);
    }

    public function update($id, Request $request)
    {
        $pulseObj = Pulse::findOrFail($id);
        $pulseObj->update($request->all());

        return response()->json($pulseObj, 200);
    }

} 