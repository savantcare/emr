<?php

namespace App\Http\Controllers;

use App\Diagnosis;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

class DiagnosisController extends Controller
{
    public function getAllTemporalDiagnosis()
    {
        
        $dignosisQuery = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_dx.assignedDiagnosis FOR SYSTEM_TIME ALL order by ROW_START desc'));

        return response()->json($dignosisQuery);
    }

    public function getOneDiagnosis($pServerSideRowUuid)
    {
        return response()->json(Diagnosis::find($pServerSideRowUuid));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $getRequestIp = $request->ip();
        
        $insertData = [
            'serverSideRowUuid'=>$requestData['data']['serverSideRowUuid'],
            'ptUuid'=>$requestData['data']['ptUuid'],
            'masterDiagnosisId'=>$requestData['data']['diagnosis'],
            'assessment'=>$requestData['data']['assessment'],
            'startDate'=>date("Y-m-d H:i:s", ((Int)$requestData['data']['onset'] / 1000)),
            'recordChangedByUuid'=>$requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress'=>$getRequestIp
        ];

        $diagnosis = Diagnosis::insert($insertData);
        return response()->json($diagnosis, 201);
    }
    
    public function delete($serverSideRowUuid, Request $request)
    {
        $diagnosis = Diagnosis::findOrFail($serverSideRowUuid);
        $requestData = $request->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'deletedNote' => $requestData['dNotes']
            );
            $diagnosis->update($updateData);
        }

        $diagnosis->delete();
        
        return response('Deleted successfully', 200);
    }
}