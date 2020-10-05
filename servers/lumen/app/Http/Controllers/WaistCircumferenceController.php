<?php

namespace App\Http\Controllers;

use App\WaistCircumference;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class WaistCircumferenceController extends Controller
{
    public function getAllTemporalWaistCircumferences()
    {
        $waistCircumferenceQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_body_measurement.waistCircumference FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($waistCircumferenceQuery);
    }

    public function getOneWaistCircumference($pServerSideRowUuid)
    {
        return response()->json(WaistCircumference::find($pServerSideRowUuid));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $waistCircumferenceData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'waistCircumferenceInInches' => $requestData['data']['waistCircumferenceInInches'],
            'timeOfMeasurement' => $requestData['data']['timeOfMeasurement'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );

        $waistCircumferenceObj = WaistCircumference::insertGetId($waistCircumferenceData);

        return response()->json($waistCircumferenceObj, 201);
    }

    public function update($id, Request $request)
    {
        $waistCircumferenceObj = WaistCircumference::findOrFail($id);
        $waistCircumferenceObj->update($request->all());

        return response()->json($waistCircumferenceObj, 200);
    }

} 