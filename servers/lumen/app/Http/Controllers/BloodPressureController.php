<?php
namespace App\Http\Controllers;

use App\BloodPressure;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class BloodPressureController extends Controller
{
    public function showAllBloodPressures()
    {
        $bloodPressureQuery = DB::select(DB::raw('SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_body_measurement.bloodPressure FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($bloodPressureQuery);
    }

    public function showOneBloodPressure($id)
    {
        return response()->json(BloodPressure::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $bloodPressureData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'bloodPressureInBpm' => $requestData['data']['bloodPressureInBpm'],
            'timeOfMeasurement' => $requestData['data']['timeOfMeasurement'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );

        $bloodPressureObj = BloodPressure::insertGetId($bloodPressureData);

        return response()->json($bloodPressureObj, 201);
    }

    public function update($id, Request $request)
    {
        $bloodPressureObj = BloodPressure::findOrFail($id);
        $bloodPressureObj->update($request->all());

        return response()->json($bloodPressureObj, 200);
    }

} 