<?php
namespace App\Http\Controllers;

use App\BloodPressure;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class BloodPressureController extends Controller
{
    public function getAllTemporalBloodPressures()
    {
        $bloodPressureQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.bloodPressure FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($bloodPressureQuery);
    }

    public function getOneBloodPressure($pServerSideRowUuid)
    {
        $bloodPressureQuery = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.bloodPressure FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$id}' order by ROW_START desc"));

        return response()->json($bloodPressureQuery);
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $bloodPressureInBpm = $requestData['data']['bloodPressureInBpm'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUUID = $requestData['data']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertBloodPressure = DB::statement("INSERT INTO `sc_body_measurement`.`bloodPressure` (`serverSideRowUuid`, `ptUuid`, `bloodPressureInBpm`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$bloodPressureInBpm}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUUID}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertBloodPressure, 201);
    }

    public function update($id, Request $request)
    {
        $requestData = $request->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $bloodPressureInBpm = $requestData['rowToUpsert']['bloodPressureInBpm'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateBloodPressure = DB::statement("UPDATE `sc_body_measurement`.`bloodPressure` SET `bloodPressureInBpm` = {$bloodPressureInBpm}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `bloodPressure`.`serverSideRowUuid` = '{$id}'");

        return response()->json($updateBloodPressure, 200);
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