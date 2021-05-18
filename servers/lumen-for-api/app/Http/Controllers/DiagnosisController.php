<?php

namespace App\Http\Controllers;

use App\Diagnosis;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

class DiagnosisController extends Controller
{
    public function get_all_temporal_diagnosis($pPtUuid)
    {
        /* Why use  trim(UNIX_TIMESTAMP(onset) * 1000)+0
            Ans : Remove floating point from onset date timestamp.
            reffarence : https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html
        */
        $dignosisQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, trim(UNIX_TIMESTAMP(onset) * 1000)+0 as onset FROM sc_dx.assignedDiagnosis FOR SYSTEM_TIME ALL where ptUuid = "'.$pPtUuid.'" order by ROW_START desc'));

        return response()->json($dignosisQueryResultObj);
    }

    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $serverSideRowUuid = $requestData['data']['serverSideRowUuid'];
        $ptUuid = $requestData['data']['ptUuid'];
        $onset = (int)($requestData['data']['onset']);
        $diagnosis = $requestData['data']['diagnosis'];
        $assessment = $requestData['data']['assessment'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $insertDiagnosis = DB::statement("INSERT INTO `sc_dx`.`assignedDiagnosis` (`serverSideRowUuid`, `ptUuid`, `diagnosis`,`assessment`,`onset`, `recordChangedByUuid`, `recordChangedFromIPAddress`) VALUES ('{$serverSideRowUuid}', '{$ptUuid}', '{$diagnosis}', '{$assessment}', FROM_UNIXTIME({$onset}/1000), '{$recordChangedByUuid}', '{$recordChangedFromIPAddress}')");

        return response()->json($insertDiagnosis, 201);
    }

    public function update($pServerSideRowUuid, Request $pRequest)
    {
        $requestData = $pRequest->all();

        $onset = (int)($requestData['data']['onset']);
        $diagnosis = $requestData['data']['diagnosis'];
        $recordChangedByUuid = $requestData['data']['recordChangedByUuid'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updateDiagnosis = DB::statement("UPDATE `sc_dx`.`assignedDiagnosis` SET `diagnosis` = '{$diagnosis}', `onset` = FROM_UNIXTIME({$onset}/1000), `recordChangedByUuid` = '{$recordChangedByUuid}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `assignedDiagnosis`.`serverSideRowUuid` = '{$pServerSideRowUuid}'");

        return response()->json($updateDiagnosis, 200);
    }

    public function delete($pServerSideRowUuid, Request $pRequest)
    {
        $diagnosis = Diagnosis::findOrFail($pServerSideRowUuid);
        $requestData = $pRequest->all();

        if (isset($requestData['dNotes']) && !empty($requestData['dNotes'])) {
            $updateData = array(
                'notes' => $requestData['dNotes']
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
