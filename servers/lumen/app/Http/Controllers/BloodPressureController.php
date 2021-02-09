<?php
namespace App\Http\Controllers;

use App\BloodPressure;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class BloodPressureController extends Controller
{
    public function get_all_temporal_blood_pressures($pPtUuid)
    {
        $bloodPressureQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliSecs) * 1000 as timeOfMeasurementInMilliSecs FROM sc_vital_signs.bloodPressureLevels FOR SYSTEM_TIME ALL  where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($bloodPressureQueryResultObj);
    }

    public function get_one_blood_pressure($pServerSideRowUuid)
    {
        $bloodPressureQueryResultObj = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliSecs) * 1000 as timeOfMeasurementInMilliSecs FROM sc_vital_signs.bloodPressureLevels FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$pServerSideRowUuid}' order by ROW_START desc"));

        return response()->json($bloodPressureQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliSecs = (int)($requestData['data']['timeOfMeasurementInMilliSecs']);
        $bloodPressureDiastolic = $requestData['data']['bloodPressureDiastolic'];
        $bloodPressureSystolic = $requestData['data']['bloodPressureSystolic'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertBloodPressure = DB::statement("INSERT INTO `sc_vital_signs`.`bloodPressureLevels` (`serverSideRowUuid`, `ptUuid`, `bloodPressureDiastolic`, `bloodPressureSystolic`, `timeOfMeasurementInMilliSecs`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$bloodPressureDiastolic},{$bloodPressureSystolic}, FROM_UNIXTIME({$timeOfMeasurementInMilliSecs}/1000), '{$notes}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertBloodPressure, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $timeOfMeasurementInMilliSecs = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliSecs']);
        $bloodPressureDiastolic = $requestData['rowToUpsert']['bloodPressureDiastolic'];
        $bloodPressureSystolic = $requestData['rowToUpsert']['bloodPressureSystolic'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUuid = $requestData['rowToUpsert']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateBloodPressure = DB::statement("UPDATE `sc_vital_signs`.`bloodPressureLevels` SET `bloodPressureDiastolic` = {$bloodPressureDiastolic}, `bloodPressureSystolic` = {$bloodPressureSystolic}, `timeOfMeasurementInMilliSecs` = FROM_UNIXTIME({$timeOfMeasurementInMilliSecs}/1000), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `bloodPressureLevels`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

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
