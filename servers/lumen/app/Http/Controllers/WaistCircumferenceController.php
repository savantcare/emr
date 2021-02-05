<?php

namespace App\Http\Controllers;

use App\WaistCircumference;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class WaistCircumferenceController extends Controller
{
    public function get_all_temporal_waist_circumferences($pPtUuid)
    {
        $waistCircumferenceQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, round(UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000) as timeOfMeasurementInMilliseconds FROM sc_vital_signs.waistCircumference FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        /* For some situations in row_start and row_end we are getting decimal values and in our frontend we have a query which checks round value because of this reason we are using round function */

        return response()->json($waistCircumferenceQueryResultObj);
    }

    public function get_one_waist_circumference($pServerSideRowUuid)
    {
        $waistCircumferenceQueryResultObj = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, round(UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000) as timeOfMeasurementInMilliseconds FROM sc_vital_signs.waistCircumference FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$pServerSideRowUuid}' order by ROW_START desc"));

        return response()->json($waistCircumferenceQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $waistCircumferenceInInches = $requestData['data']['waistCircumferenceInInches'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertWaistCircumference = DB::statement("INSERT INTO `sc_vital_signs`.`waistCircumference` (`serverSideRowUuid`, `ptUuid`, `waistCircumferenceInInches`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$waistCircumferenceInInches}, round(FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000)), '{$notes}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertWaistCircumference, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $waistCircumferenceInInches = $requestData['rowToUpsert']['waistCircumferenceInInches'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUuid = $requestData['rowToUpsert']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateWaistCircumference = DB::statement("UPDATE `sc_vital_signs`.`waistCircumference` SET `waistCircumferenceInInches` = {$waistCircumferenceInInches}, `timeOfMeasurementInMilliseconds` = round(FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000)), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `waistCircumference`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updateWaistCircumference, 200);
    }

    public function get_client_ip()
    {
        $ipaddress = '';
        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
        } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
            $ipaddress = $_SERVER['HTTP_FORWARDED'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ipaddress = $_SERVER['REMOTE_ADDR'];
        } else {
            $ipaddress = 'UNKNOWN';
        }
        return $ipaddress;
    }
}
