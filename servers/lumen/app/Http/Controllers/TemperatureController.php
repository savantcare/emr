<?php
namespace App\Http\Controllers;

use App\Temperature;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class TemperatureController extends Controller
{
    public function getAllTemporalTemperatures()
    {
        $temperatureQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurements.temperature FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($temperatureQuery);
    }

    public function getOneTemperature($pServerSideRowUuid)
    {
        $temperatureQuery = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_body_measurements.temperature FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$serverSideRowUuid}' order by ROW_START desc"));

        return response()->json($temperatureQuery);
    }


    /*
    To check temperature/create in postman make a post request with the following JSON:
    Open postman desktop app and then:
    URL: http://localhost:8000/public/api/temperature/v20/
    Post / Body raw: {"rowToUpsert":{"$id":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01817fb0-c1ef-11ea-a3a5-f36fe4d74da4","temperatureInFarehnite":100,"timeOfMeasurementInMilliseconds":1601876131994,"notes":"test","recordChangedByUUID":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ROW_START":1601877241687,"ROW_END":2147483648000}}
    */



    public function create(Request $request)
    {
        $requestData = $request->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $temperatureInFarehnite = $requestData['data']['temperatureInFarehnite'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUUID = $requestData['data']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertTempereture = DB::statement("INSERT INTO `sc_body_measurements`.`temperature` (`serverSideRowUuid`, `ptUuid`, `temperatureInFarehnite`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUUID`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$temperatureInFarehnite}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUUID}', '{$recordChangedFromIPAddress}')");

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

        $updateTempereture = DB::statement("UPDATE `sc_body_measurements`.`temperature` SET `temperatureInFarehnite` = {$temperatureInFarehnite}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `temperature`.`serverSideRowUuid` = '{$serverSideRowUuid}'");

        return response()->json($updateTempereture, 200);
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
