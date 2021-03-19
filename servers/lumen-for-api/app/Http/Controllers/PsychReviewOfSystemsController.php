<?php
namespace App\Http\Controllers;

use App\PsychReviewOfSystems;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class PsychReviewOfSystemsController extends Controller
{
    public function get_all_temporal_psychReviewOfSystems($pPtUuid)
    {
        $psychReviewOfSystemsQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_psych_review_of_systems.psych_review_of_systems FOR SYSTEM_TIME ALL  where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));
        return response()->json($psychReviewOfSystemsQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        unset($requestData['data']['$id']);
        unset($requestData['data']['vnRowStateInSession']);
        unset($requestData['data']['isValidationError']);
        unset($requestData['data']['clientSideUniqRowId']);
        unset($requestData['data']['ROW_START']);
        unset($requestData['data']['ROW_END']);
        unset($requestData['data']['client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change']);

        $recordChangedFromIPAddress = $this->get_client_ip();
        $requestData['data']['recordChangedFromIPAddress'] = $recordChangedFromIPAddress;

        $psychReviewOfSystems = PsychReviewOfSystems::insertGetId($requestData['data']);

        return response()->json($psychReviewOfSystems, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $psychReviewOfSystems = PsychReviewOfSystems::findOrFail($pServerSideRowUuid);
        $psychReviewOfSystems->update($requestData['data']);

        return response()->json($psychReviewOfSystems, 200);
    }


    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $psychReviewOfSystems = PsychReviewOfSystems::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['data']['notes']) && !empty($requestData['data']['notes'])) {
            $updateData = array(
                'notes' => $requestData['data']['notes']
            );
            $psychReviewOfSystems->update($updateData);
        }

        $psychReviewOfSystems->delete();

        return response('Deleted successfully', 200);
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