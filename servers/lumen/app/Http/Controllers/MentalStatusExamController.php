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
        
        $arMentalStatusExamData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'patientUuid' => $requestData['data']['ptUuid'],
            'appearance_select' => $requestData['data']['appearance_select'],
            'psychomotor_select' => $requestData['data']['psychomotor_select'],
            'attitude_multi_select' => $requestData['data']['attitude_multi_select'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $requestData['data']['recordChangedFromIPAddress'],
        );
       
        $mentalStatusExam = MentalStatusExam::insertGetId($arMentalStatusExamData);

        return response()->json($mentalStatusExam, 201);
    }
 
    public function delete($pServerSideRowUuid)
    {
        $mentalStatusExam = MentalStatusExam::findOrFail($pServerSideRowUuid);
        $mentalStatusExam->delete();
        return response('Deleted successfully', 200);
    }
}
