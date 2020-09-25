<?php
namespace App\Http\Controllers;

use App\Temperature;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class TemperatureController extends Controller
{
    public function showAllTemperatures()
    {
        $temperatureQuery = DB::select(DB::raw('SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.temperature FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($temperatureQuery);
    }

    public function showOneTemperature($id)
    {
        return response()->json(Temperature::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $temperatureData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'temperatureInFarehnite' => $requestData['data']['temperatureInFarehnite'],
            'timeOfMeasurement' => $requestData['data']['timeOfMeasurement'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );

        $temperatureObj = Temperature::insertGetId($temperatureData);

        return response()->json($temperatureObj, 201);
    }

    public function update($id, Request $request)
    {
        $temperatureObj = Temperature::findOrFail($id);
        $temperatureObj->update($request->all());

        return response()->json($temperatureObj, 200);
    }

} 