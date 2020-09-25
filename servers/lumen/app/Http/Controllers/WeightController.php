<?php

namespace App\Http\Controllers;

use App\Weight;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class WeightController extends Controller
{
    public function showAllWeights()
    {
        $weightQuery = DB::select(DB::raw('SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.weight FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($weightQuery);
    }

    public function showOneWeight($id)
    {
        return response()->json(Weight::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $weightData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'weightInPounds' => $requestData['data']['weightInPounds'],
            'timeOfMeasurement' => $requestData['data']['timeOfMeasurement'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $weightObj = Weight::insertGetId($weightData);

        return response()->json($weightObj, 201);
    }

    public function update($id, Request $request)
    {
        $weightObj = Weight::findOrFail($id);
        $weightObj->update($request->all());

        return response()->json($weightObj, 200);
    }

}