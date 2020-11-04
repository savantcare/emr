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

    // public function getOneDiagnosis($pServerSideRowUuid)
    // {
    //     return response()->json(Diagnosis::find($pServerSideRowUuid));
    // }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $startDate = (int)($requestData['data']['onset']);
        $masterDiagnosisId = $requestData['data']['diagnosis'];
        $assessment = $requestData['data']['assessment'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertDiagnosis = DB::statement("INSERT INTO `sc_dx`.`assignedDiagnosis` (`serverSideRowUuid`, `ptUuid`, `masterDiagnosisId`,`assessment`,`startDate`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', {$masterDiagnosisId}, '{$assessment}', FROM_UNIXTIME({$startDate}/1000), '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertDiagnosis, 201);
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