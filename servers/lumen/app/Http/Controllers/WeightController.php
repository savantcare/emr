<?php
namespace App\Http\Controllers;

use App\Weight;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class WeightController extends Controller
{
    public function getAllTemporalWeights()
    {
        $weightQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_vital_signs.weight FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($weightQuery);
    }

    public function getOneWeight($pServerSideRowUuid)
    {
        $weightQuery = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(timeOfMeasurementInMilliseconds) * 1000 as timeOfMeasurementInMilliseconds FROM sc_vital_signs.weight FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$pServerSideRowUuid}' order by ROW_START desc"));

        return response()->json($weightQuery);
    }


    /*
    To check weight/create in postman make a post request with the following JSON:
    Open postman desktop app and then:
    URL: http://localhost:8000/public/api/weight/v20/
    Post / Body raw: {"rowToUpsert":{"$pServerSideRowUuid":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"pServerSideRowUuid":"01817fb0-c1ef-11ea-a3a5-f36fe4d74da4","weightInFarehnite":100,"timeOfMeasurementInMilliseconds":1601876131994,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ROW_START":1601877241687,"ROW_END":2147483648000}}
    */



    public function create(Request $request)
    {
        $requestData = $request->all();

        $pServerSideRowUuid = $requestData['data']['pServerSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $timeOfMeasurementInMilliseconds = (int)($requestData['data']['timeOfMeasurementInMilliseconds']);
        $weightInFarehnite = $requestData['data']['weightInFarehnite'];
        $notes = $requestData['data']['notes'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertTempereture = DB::statement("INSERT INTO `sc_vital_signs`.`weight` (`pServerSideRowUuid`, `ptUuid`, `weightInFarehnite`, `timeOfMeasurementInMilliseconds`, `notes`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$pServerSideRowUuid}', '{$ptUuid}', {$weightInFarehnite}, FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), '{$notes}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertTempereture, 201);
    }

    /*
    To check weight/update in postman make a put request with the following JSON:
    Open postman desktop app and then:
    URL: http://localhost:8000/public/api/weight/v20/
    Put / Body JSON: {"rowToUpsert":{"$serverSideRowUuid":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01817fb0-c1ef-11ea-a3a5-f36fe4d74da4","weightInFarehnite":100,"timeOfMeasurementInMilliseconds":1601876131994,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ROW_START":1601877241687,"ROW_END":2147483648000}}
    */



    public function update($pServerSideRowUuid, Request $request)
    {
        $requestData = $request->all();

        $timeOfMeasurementInMilliseconds = (int)($requestData['rowToUpsert']['timeOfMeasurementInMilliseconds']);
        $weightInPounds = $requestData['rowToUpsert']['weightInPounds'];
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUuid = $requestData['rowToUpsert']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateTempereture = DB::statement("UPDATE `sc_vital_signs`.`weight` SET `weightInPounds` = {$weightInPounds}, `timeOfMeasurementInMilliseconds` = FROM_UNIXTIME({$timeOfMeasurementInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `weight`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

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
