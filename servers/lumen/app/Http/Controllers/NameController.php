<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class NameController extends Controller
{

    public function showUserName($id)
    {
        $nameQuery = DB::select(DB::raw("SELECT firstName, middleName, lastName, serverSideRowUuid, UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM sc_user.users FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$id}' order by ROW_START desc"));

        return response()->json($nameQuery);
    }
    
    public function update($id, Request $request)
    {
        $requestData = $request->all();

        $firstName = $requestData['rowToUpsert']['firstName'];
        $middleName = $requestData['rowToUpsert']['middleName'];
        $lastName = $requestData['rowToUpsert']['lastName'];

        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateUserName = DB::statement("UPDATE `sc_user`.`users` SET `firstName` = '{$firstName}', `middleName` = '{$middleName}', `lastName` = '{$lastName}', `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE users.`serverSideRowUuid` = '{$id}'");

        return response()->json($updateUserName, 200);
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