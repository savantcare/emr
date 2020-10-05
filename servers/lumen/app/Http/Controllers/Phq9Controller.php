<?php
namespace App\Http\Controllers;
use App\Phq9;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;
\Predis\Autoloader::register();


class Phq9Controller extends Controller
{
    public function  showAllPhq9Screen() 
    {
        $phq9Data = DB::select(DB::raw('SELECT serverSideRowUuid, ptUUID as patientUUID, questionUUID as phq9QuestionMasterId,  answerValue as optionValueChosenByPatient,  round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END, UNIX_TIMESTAMP(submittedOnDateTimeInMilliseconds) * 1000 as submittedOnDateTimeInMilliseconds FROM sc_scr.phq9PtResponses FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($phq9Data);
    }

    public function showOnePhq9Screen($id) 
    {
        return response()->json(Phq9::find($id));
    }

    public function create(Request $request) 
    {
        $requestData = $request->all();

        $phq9Data = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUUID' => $requestData['data']['ptUUID'],
            'questionUUID' => $requestData['data']['questionUUID'],
            'answerValue' => $requestData['data']['answerValue'],
            'submittedOnDateTimeInMilliseconds' => $requestData['data']['submittedOnDateTimeInMilliseconds'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID'],
            'recordChangedFromIPAddress' => $this->get_client_ip()
        );
       
        $phq9RowId = Phq9::insertGetId($phq9Data);

        return response()->json($phq9RowId, 201);

    }

    public function update($id, Request $request) 
    {
        $requestData = $request->all();

        $questionUUID = $requestData['rowToUpsert']['questionUUID'];
        $answerValue = $requestData['rowToUpsert']['answerValue'];
        $submittedOnDateTimeInMilliseconds = (int)($requestData['rowToUpsert']['submittedOnDateTimeInMilliseconds']);
        $recordChangedByUUID = $requestData['rowToUpsert']['recordChangedByUUID'];
        $recordChangedFromIPAddress = $this->get_client_ip();

        $updatePhq9 = DB::statement("UPDATE `sc_scr`.`phq9PtResponses` SET `questionUUID` = {$questionUUID},`answerValue` = {$answerValue}, `submittedOnDateTimeInMilliseconds` = FROM_UNIXTIME({$submittedOnDateTimeInMilliseconds}/1000),  `recordChangedByUUID` = '{$recordChangedByUUID}', `recordChangedFromIPAddress` = '{$recordChangedFromIPAddress}' WHERE `phq9PtResponses`.`serverSideRowUuid` = '{$id}'");

        return response()->json($updatePhq9, 200);
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