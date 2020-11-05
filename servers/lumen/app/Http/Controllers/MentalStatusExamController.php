<?php

namespace App\Http\Controllers;

use App\MentalStatusExam;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class MentalStatusExamController extends Controller
{
    public function getAllTemporalMentalStatusExams()
    {
        $mentalStatusExamQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_mse.pt_mental_status_exam order by ROW_END desc,ROW_START desc'));
        return response()->json($mentalStatusExamQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $arMentalStatusExamData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'appearance_select' => $requestData['data']['appearance_select'],
            'psychomotor_select' => $requestData['data']['psychomotor_select'],
            'attitude_multi_select' => $requestData['data']['attitude_multi_select'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress
        );
       
        $mentalStatusExam = MentalStatusExam::insertGetId($arMentalStatusExamData);

        return response()->json($mentalStatusExam, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();
        $mentalStatusExam = ServiceStatement::findOrFail($pServerSideRowUuid);
        $mentalStatusExam->update($requestData['data']);

        return response()->json($mentalStatusExam, 200);
    }
 
    public function delete($pServerSideRowUuid)
    {
        $mentalStatusExam = MentalStatusExam::findOrFail($pServerSideRowUuid);
        $mentalStatusExam->delete();
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
