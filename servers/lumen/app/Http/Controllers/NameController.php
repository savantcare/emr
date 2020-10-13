<?php
namespace App\Http\Controllers;

use App\Users;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class NameController extends Controller
{
    public function getUserFullName($pServerSideRowUuid)
    {
        $fullNameQueryResultObj = DB::select(DB::raw("SELECT `serverSideRowUuid`, `firstName`, `middleName`, `lastName` FROM sc_users.users WHERE `users`.`serverSideRowUuid` LIKE '{$pServerSideRowUuid}'"));
        return response()->json($fullNameQueryResultObj);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $firstName = $requestData['rowToUpsert']['firstName'];
        $middleName = $requestData['rowToUpsert']['middleName'];
        $lastName = $requestData['rowToUpsert']['lastName'];

        $updateDateOfBirth = DB::statement("UPDATE `sc_users`.`users` SET `firstName` = '{$firstName}', `middleName` = '{$middleName}', `lastName` = '{$lastName}' WHERE `users`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updateDateOfBirth, 200);
    }
}
