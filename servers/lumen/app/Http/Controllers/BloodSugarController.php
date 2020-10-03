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
        $bloodSugarQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.bloodSugar FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($bloodSugarQuery);
    }

    public function showOneBloodSugar($id)
    {
        $bloodSugarQuery = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.bloodSugar FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$id}' order by ROW_START desc"));

        return response()->json($bloodSugarQuery);
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUUID = $requestData['data']['ptUUID'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $bloodSugarInBpm = $requestData['data']['bloodSugarInBpm'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUUID = $requestData['data']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertBloodSugar = DB::statement("INSERT INTO `sc_body_measurement`.`bloodSugar` (`serverSideRowUuid`, `ptUUID`, `bloodSugarInBpm`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUUID}', {$bloodSugarInBpm}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUUID}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertBloodSugar, 201);
    }

    public function update($id, Request $request)
    {
        $requestData = $request->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $bloodSugarInBpm = $requestData['rowToUpsert']['bloodSugarInBpm'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateBloodSugar = DB::statement("UPDATE `sc_body_measurement`.`bloodSugar` SET `bloodSugarInBpm` = {$bloodSugarInBpm}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `bloodSugar`.`serverSideRowUuid` = '{$id}'");

        return response()->json($updateBloodSugar, 200);
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