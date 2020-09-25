<?php

namespace App\Http\Controllers;

use App\BloodSugar;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class BloodSugarController extends Controller
{
    public function showAllBloodSugars()
    {
        $bloodSugarQuery = DB::select(DB::raw('SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.bloodSugar FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($bloodSugarQuery);
    }

    public function showOneBloodSugar($id)
    {
        return response()->json(BloodSugar::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $bloodSugarData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'bloodSugarInBpm' => $requestData['data']['bloodSugarInBpm'],
            'timeOfMeasurement' => $requestData['data']['timeOfMeasurement'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );

        $bloodSugarObj = BloodSugar::insertGetId($bloodSugarData);

        return response()->json($bloodSugarObj, 201);
    }

    public function update($id, Request $request)
    {
        $bloodSugarObj = BloodSugar::findOrFail($id);
        $bloodSugarObj->update($request->all());

        return response()->json($bloodSugarObj, 200);
    }

} 