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

    public function showOneTemperature($serverSideRowUuid)
    {
        $temperatureQuery = DB::select(DB::raw("SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.temperature FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$serverSideRowUuid}' order by ROW_START desc"));

        return response()->json($temperatureQuery);
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUUID = $requestData['data']['ptUUID'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $temperatureInFarehnite = $requestData['data']['temperatureInFarehnite'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUUID = $requestData['data']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertTempereture = DB::statement("INSERT INTO `sc_body_measurement`.`temperature` (`serverSideRowUuid`, `ptUUID`, `temperatureInFarehnite`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUUID}', {$temperatureInFarehnite}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUUID}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertTempereture, 201);
    }

    public function update($serverSideRowUuid, Request $request)
    {
        $requestData = $request->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $temperatureInFarehnite = $requestData['rowToUpsert']['temperatureInFarehnite'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateTempereture = DB::statement("UPDATE `sc_body_measurement`.`temperature` SET `temperatureInFarehnite` = {$temperatureInFarehnite}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `temperature`.`serverSideRowUuid` = '{$serverSideRowUuid}'");

        return response()->json($updateTempereture, 200);
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