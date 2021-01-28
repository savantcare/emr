<?php

namespace App\Http\Controllers;

use App\PlanComments;
use Illuminate\Http\Request;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();

class PlanCommentsController extends Controller
{
    public function get_all_temporal_plan_comments($pPtUuid)
    {
        $planCommentsQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_plan_comments.plan_comments FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($planCommentsQuery);
    }

    public function get_one_plan_comments($pServerSideRowUuid)
    {
        $planCommentsQuery = DB::select(DB::raw("SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_plan_comments.plan_comments FOR SYSTEM_TIME ALL WHERE serverSideRowUuid LIKE '{$pServerSideRowUuid}' order by ROW_START desc"));

        return response()->json($planCommentsQuery);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();

        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $description = $requestData['data']['description'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertPlanComments = DB::statement("INSERT INTO `sc_plan_comments`.`plan_comments` (`serverSideRowUuid`, `ptUuid`, `description`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', '{$description}', '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertPlanComments, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $description = $requestData['rowToUpsert']['description'];
        $recordChangedByUuid = $requestData['rowToUpsert']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updatePlanComments = DB::statement("UPDATE `sc_plan_comments`.`plan_comments` SET `description` = {$description}, `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `plan_comments`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updatePlanComments, 200);
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
