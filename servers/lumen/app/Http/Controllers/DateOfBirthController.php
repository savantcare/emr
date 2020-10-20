<?php

namespace App\Http\Controllers;

use App\DateOfBirth;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class DateOfBirthController extends Controller
{
    public function getPatientDateOfBirth($pPatientUuid)
    {
        $dateOfBirthQueryResultObj = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(dateOfBirthInMilliseconds) * 1000 as dateOfBirthInMilliseconds FROM sc_patient_info.dateOfBirth FOR SYSTEM_TIME ALL WHERE patientUuid LIKE '{$pPatientUuid}' order by ROW_START desc"));

        return response()->json($dateOfBirthQueryResultObj);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $dateOfBirthInMilliseconds = (int)($requestData['rowToUpsert']['dateOfBirthInMilliseconds']);
        $notes = $requestData['rowToUpsert']['notes'];
        $recordChangedByUuid = $requestData['rowToUpsert']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateDateOfBirth = DB::statement("UPDATE `sc_patient_info`.`dateOfBirth` SET `dateOfBirthInMilliseconds` = FROM_UNIXTIME({$dateOfBirthInMilliseconds}/1000), `notes` = '{$notes}', `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `dateOfBirth`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updateDateOfBirth, 200);
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
