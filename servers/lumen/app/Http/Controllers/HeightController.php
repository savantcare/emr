<?php

namespace App\Http\Controllers;

use App\Height;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class HeightController extends Controller
{
    public function showAllHeights()
    {
        $heightQuery = DB::select(DB::raw('SELECT *,UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.height FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($heightQuery);
    }

    public function showOneHeight($id)
    {
        $heightQuery = DB::select(DB::raw("SELECT *, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurement.height FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$id}' order by ROW_START desc"));

        return response()->json($heightQuery);
    }

    public function create(Request $request)
    {
        $requestData = $request->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUUID = $requestData['data']['ptUUID'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $heightInInches = $requestData['data']['heightInInches'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUUID = $requestData['data']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertHeightInInch = DB::statement("INSERT INTO `sc_body_measurement`.`height` (`serverSideRowUuid`, `ptUUID`, `HeightInInch`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUUID}', {$heightInInches}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUUID}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertHeightInInch, 201);
    }

    public function update($id, Request $request)
    {

        $requestData = $request->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $heightInInches = $requestData['rowToUpsert']['heightInInches'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateHeightInInch = DB::statement("UPDATE `sc_body_measurement`.`height` SET `heightInInches` = {$heightInInches}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `height`.`serverSideRowUuid` = '{$id}'");

        return response()->json($updateHeightInInch, 200);
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
