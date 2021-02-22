<?php

namespace App\Http\Controllers;

use App\Examination;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class ExaminationController extends Controller
{
    public function get_all_temporal_examinations($pPtUuid)
    {
        $examinationQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_examination.pt_examination where ptUuid = "'.$pPtUuid.'" order by ROW_END desc,ROW_START desc'));
        return response()->json($examinationQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $arExaminationData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'appearance_multi_select' => $requestData['data']['appearance_multi_select'],
            'cognition_multi_select' => $requestData['data']['cognition_multi_select'],
            'attitude_multi_select' => $requestData['data']['attitude_multi_select'],
            'constitutional_multi_select' => $requestData['data']['constitutional_multi_select'],
            'eye_contact_multi_select' => $requestData['data']['eye_contact_multi_select'],
            'impulse_control_multi_select' => $requestData['data']['impulse_control_multi_select'],
            'insight_multi_select' => $requestData['data']['insight_multi_select'],
            'judgement_multi_select' => $requestData['data']['judgement_multi_select'],
            'mood_affect_multi_select' => $requestData['data']['mood_affect_multi_select'],
            'neurological_multi_select' => $requestData['data']['neurological_multi_select'],
            'perceptions_multi_select' => $requestData['data']['perceptions_multi_select'],
            'psychomotor_multi_select' => $requestData['data']['psychomotor_multi_select'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );

        $examination = Examination::insertGetId($arExaminationData);

        return response()->json($examination, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $examination = Examination::findOrFail($pServerSideRowUuid);
        $examination->update($requestData['data']);

        return response()->json($examination, 200);
    }

    public function delete($pServerSideRowUuid)
    {
        $examination = Examination::findOrFail($pServerSideRowUuid);
        $examination->delete();
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
