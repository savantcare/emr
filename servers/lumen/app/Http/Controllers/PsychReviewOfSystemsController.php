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
        $psychReviewOfSystemsQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_psych_review_of_systems.psych_review_of_systems FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));
        return response()->json($psychReviewOfSystemsQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $psychReviewOfSystemsData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'subjective' => $requestData['data']['subjective'],
            'depressive_mood' => $requestData['data']['depressive_mood'],
            'depressive_interest' => $requestData['data']['depressive_interest'],
            'depressive_sleep' => $requestData['data']['depressive_sleep'],
            'depressive_esteem' => $requestData['data']['depressive_esteem'],
            'depressive_energy' => $requestData['data']['depressive_energy'],
            'depressive_conc' => $requestData['data']['depressive_conc'],
            'depressive_appetite' => $requestData['data']['depressive_appetite'],
            'depressive_retardation' => $requestData['data']['depressive_retardation'],
            'depressive_suicidal' => $requestData['data']['depressive_suicidal'],
            'gateway_depressed' => $requestData['data']['gateway_depressed'],
            'gateway_energetic' => $requestData['data']['gateway_energetic'],
            'gateway_interest' => $requestData['data']['gateway_interest'],
            'gateway_mood' => $requestData['data']['gateway_mood'],
            'gateway_irritable' => $requestData['data']['gateway_irritable'],
            'gateway_difficult' => $requestData['data']['gateway_difficult'],
            'mania_mood' => $requestData['data']['mania_mood'],
            'mania_irritable' => $requestData['data']['mania_irritable'],
            'mania_energy' => $requestData['data']['mania_energy'],
            'mania_sleep' => $requestData['data']['mania_sleep'],
            'mania_talking' => $requestData['data']['mania_talking'],
            'mania_racing' => $requestData['data']['mania_racing'],
            'mania_distractability' => $requestData['data']['mania_distractability'],
            'mania_risk' => $requestData['data']['mania_risk'],
            'obese' => $requestData['data']['obese'],
            'thinCachectic' => $requestData['data']['thinCachectic'],
            'disheveledUnkempt' => $requestData['data']['disheveledUnkempt'],
            'malodorous' => $requestData['data']['malodorous'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress,
        );

        $psychReviewOfSystems = PsychReviewOfSystems::insertGetId($psychReviewOfSystemsData);

        return response()->json($psychReviewOfSystems, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $goal = Goal::findOrFail($pServerSideRowUuid);
        $goal->update($requestData['data']);

        return response()->json($goal, 200);
    }


    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $goal = Goal::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['data']['notes']) && !empty($requestData['data']['notes'])) {
            $updateData = array(
                'notes' => $requestData['data']['notes']
            );
            $goal->update($updateData);
        }

        $goal->delete();

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
