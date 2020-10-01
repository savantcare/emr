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
        $temperatureQuery = DB::select(DB::raw('SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.temperature FOR SYSTEM_TIME ALL order by ROW_START desc'));
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
            'timeOfMeasurementInMilliseconds' => $requestData['data']['timeOfMeasurementInMilliseconds'],
            'notes' => $requestData['data']['notes'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID'],
            'recordChangedFromIPAddress' => $this->get_client_ip()
        );

        $temperatureObj = Temperature::insertGetId($temperatureData);

        return response()->json($temperatureObj, 201);
    }

    public function update($id, Request $request)
    {
        $temperatureObj = Temperature::findOrFail($id);
        $requestData = $request->all();
        $requestData['rowToUpsert']['recordChangedFromIPAddress'] = $this->get_client_ip();$timeOfMeasurement = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']) / 1000;
        $requestData['rowToUpsert']['timeOfMeasurementInMilliseconds'] = date('Y-m-d H:i:s', $timeOfMeasurement);
        $requestData['rowToUpsert']['recordChangedFromIPAddress'] = $this->get_client_ip();

        $temperatureObj->update($requestData['rowToUpsert']);

        return response()->json($requestData['rowToUpsert'], 200);
    }

    public function get_client_ip() {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP']))
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_X_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        else if(isset($_SERVER['HTTP_FORWARDED']))
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        else if(isset($_SERVER['REMOTE_ADDR']))
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

}  