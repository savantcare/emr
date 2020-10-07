<?php

namespace App\Http\Controllers;

use App\Diagnosis;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

class DiagnosisController extends Controller
{
    public function getAllDiagnosis()
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
        $Diagnosis = Diagnosis::insert($requestData['insert']);
        return response()->json($Diagnosis, 201);
    }
    
    public function delete($serverSideRowUuid, Request $request)
    {
        $Diagnosis = Diagnosis::findOrFail($serverSideRowUuid);
        $requestData = $request->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'discontinueNote' => $requestData['dNotes']
            );
            $Diagnosis->update($updateData);
        }

        $Diagnosis->delete();
        
        return response('Deleted successfully', 200);
    }
}