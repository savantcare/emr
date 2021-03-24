<?php
namespace App\Http\Controllers;

use App\Temperature;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class TemperatureController extends Controller
{
    public function get_all_temporal_temperatures($pPtUuid)
    {
        $temperatureQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, trim((UNIX_TIMESTAMP(timeOfMeasurementInMilliSecs) * 1000))+0 as timeOfMeasurementInMilliSecs FROM sc_vital_signs.temperature FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($temperatureQuery);
    }

    /*
    To check temperature/create in postman make a post request with the following JSON:
    Open postman desktop app and then:
    URL: http://localhost:8000/public/api/temperature/v20/
    Post / Body raw: {"rowToUpsert":{"$serverSideRowUuid":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01817fb0-c1ef-11ea-a3a5-f36fe4d74da4","temperatureInFarehnite":100,"timeOfMeasurementInMilliSecs":1601876131994,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ROW_START":1601877241687,"ROW_END":2147483648000}}
    */

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliSecs = (int)($requestData['data']['timeOfMeasurementInMilliSecs']);
        $temperatureInFarehnite = $requestData['data']['temperatureInFarehnite'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertTempereture = DB::statement("INSERT INTO `sc_vital_signs`.`temperature` (`serverSideRowUuid`, `ptUuid`, `temperatureInFarehnite`, `timeOfMeasurementInMilliSecs`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$temperatureInFarehnite}, FROM_UNIXTIME({$timeOfMeasurementInMilliSecs}/1000), '{$notes}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertTempereture, 201);
    }

    /*
    To check temperature/update in postman make a put request with the following JSON:
    Open postman desktop app and then:
    URL: http://localhost:8000/public/api/temperature/v20/
    Put / Body JSON: {"rowToUpsert":{"$serverSideRowUuid":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01817fb0-c1ef-11ea-a3a5-f36fe4d74da4","temperatureInFarehnite":100,"timeOfMeasurementInMilliSecs":1601876131994,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ROW_START":1601877241687,"ROW_END":2147483648000}}
    */

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $timeOfMeasurementInMilliSecs = (int)($requestData['data']['timeOfMeasurementInMilliSecs']);
        $temperatureInFarehnite = $requestData['data']['temperatureInFarehnite'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateTempereture = DB::statement("UPDATE `sc_vital_signs`.`temperature` SET `temperatureInFarehnite` = {$temperatureInFarehnite}, `timeOfMeasurementInMilliSecs` = FROM_UNIXTIME({$timeOfMeasurementInMilliSecs}/1000), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `temperature`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

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
