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
            'serverSideRowUuid' => $requestData['serverSideRowUuid'],
            'patientUuid' => $requestData['patientUuid'],
            'mentalStatusExamMasterId' => $requestData['mentalStatusExamFieldIdFromMentalStatusExamMaster'],
            'recordChangedByUuid' => $requestData['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $requestData['recordChangedFromIPAddress'],
        );
        if(isset($requestData['description'])){
            $arMentalStatusExamData['description']=$requestData['description'];
        }

        $currentMentalStatusExam=MentalStatusExam::select('serverSideRowUuid')
        ->where('serverSideRowUuid',$requestData['serverSideRowUuid'])
        ->first();

        if($currentMentalStatusExam){
            $currentMentalStatusExam->update($arMentalStatusExamData);
        }
        else{
            $mentalStatusExam = MentalStatusExam::insertGetId($arMentalStatusExamData);
        }
        

        return response()->json($mentalStatusExam, 201);
    }
 
    public function delete($pServerSideRowUuid)
    {
        $mentalStatusExam = MentalStatusExam::findOrFail($pServerSideRowUuid);
        $mentalStatusExam->delete();
        return response('Deleted successfully', 200);
    }
}
