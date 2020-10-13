<?php

namespace App\Http\Controllers;

use App\Users;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();

class DateOfBirthController extends Controller
{
    public function getUserDateOfBirth($pServerSideRowUuid)
    {
        $dateOfBirthQueryResultObj = DB::select(DB::raw("SELECT `serverSideRowUuid`, UNIX_TIMESTAMP(dateOfBirthInMilliseconds) * 1000 as dateOfBirthInMilliseconds, notes FROM sc_users.users WHERE `users`.`serverSideRowUuid` LIKE '{$pServerSideRowUuid}'"));

        return response()->json($dateOfBirthQueryResultObj);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $dateOfBirthInMilliseconds = (int)($requestData['rowToUpsert']['dateOfBirthInMilliseconds']);
        $notes = $requestData['rowToUpsert']['notes'];

        $updateDateOfBirth = DB::statement("UPDATE `sc_users`.`users` SET `dateOfBirthInMilliseconds` = FROM_UNIXTIME({$dateOfBirthInMilliseconds}/1000), `notes` = '{$notes}' WHERE `users`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updateDateOfBirth, 200);
    }
}   