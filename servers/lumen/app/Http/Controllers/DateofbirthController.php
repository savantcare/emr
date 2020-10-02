<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class DateofbirthController extends Controller
{

    public function showUserDateofBirth($id)
    {
        $dobQuery = DB::select(DB::raw("SELECT  UNIX_TIMESTAMP(dateOfBirthInMilliseconds) * 1000 as dateOfBirthInMilliseconds, serverSideRowUuid, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_user.users FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$id}' order by ROW_START desc"));
        return response()->json($dobQuery);
    }
    
    public function update($id, Request $request)
    {
        $requestData = $request->all();

        $dateOfBirthInMilliseconds = (int)($requestData['rowToUpsert']['dateOfBirthInMilliseconds']);
        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateDateOfBirth = DB::statement("UPDATE `sc_user`.`users` SET `dateOfBirthInMilliseconds` = FROM_UNIXTIME({$dateOfBirthInMilliseconds}/1000), `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `users`.`serverSideRowUuid` = '{$id}'");

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

