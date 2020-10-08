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
        $waistCircumferenceQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_vital_signs.waistCircumference FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($waistCircumferenceQuery);
    }

    public function getOneWaistCircumference($serverSideRowUuid)
    {
        $waistCircumferenceQuery = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_vital_signs.waistCircumference FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$serverSideRowUuid}' order by ROW_START desc"));

        return response()->json($waistCircumferenceQuery);
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $waistCircumferenceInInches = $requestData['data']['waistCircumferenceInInches'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertWaistCircumference = DB::statement("INSERT INTO `sc_vital_signs`.`waistCircumference` (`serverSideRowUuid`, `ptUuid`, `waistCircumferenceInInches`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$waistCircumferenceInInches}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertWaistCircumference, 201);
    }

    public function update($serverSideRowUuid, Request $request)
    {
        $requestData = $request->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $waistCircumferenceInInches = $requestData['rowToUpsert']['waistCircumferenceInInches'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUuid = $requestData['rowToUpsert']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateWaistCircumference = DB::statement("UPDATE `sc_vital_signs`.`waistCircumference` SET `waistCircumferenceInInches` = {$waistCircumferenceInInches}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `waistCircumference`.`serverSideRowUuid` = '{$serverSideRowUuid}'");

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
