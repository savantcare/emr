<?php
namespace App\Http\Controllers;

use App\Goal;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;
use Predis\Autoloader;

\Predis\Autoloader::register();


class GoalController extends Controller
{
    public function getAllTemporalGoals()
    {
        $goalQueryResultObj = DB::select(DB::raw('SELECT *, round(UNIX_TIMESTAMP(ROW_START) * 1000) as ROW_START, round(UNIX_TIMESTAMP(ROW_END) * 1000) as ROW_END FROM sc_goals.goals FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($goalQueryResultObj);
        // return response()->json(Goal::all());
    }

    public function getOneGoal($pServerSideRowUuid)
    {
        return response()->json(Goal::find($pServerSideRowUuid));
    }

    /*

    To check postman/post/ URL: http://localhost:8000/public/api/goals/v20/
    Body / Json
    {"data":{"$serverSideRowUuid":"3","vnRowStateInSession":34,"validationClass":"","isValidationError":false,"clientSideUniqRowId":3,"serverSideRowUuid":"01014fb0-c1ef-11ea-a3a5-f36fe4d74da4","description":200,"notes":"test","recordChangedByUuid":"bfe041fa-073b-4223-8c69-0540ee678ff8","recordChangedFromIPAddress":"::1","recordChangedFromSection":"null","ptUuid":"1", "client_side_socketId_to_prevent_duplicate_UI_change_on_client_that_requested_server_for_data_change":"1"}}
    Wiki has a video on youtube
    */
    public function create(Request $pRequest)
    {
        $requestData = $pRequest->all();
        $recordChangedFromIPAddress = $this->get_client_ip();
        $goalData = array(
            'serverSideRowUuid' => $requestData['data']['serverSideRowUuid'],
            'ptUuid' => $requestData['data']['ptUuid'],
            'description' => $requestData['data']['description'],
            'priority' => $requestData['data']['priority'],
            'rating' => $requestData['data']['rating'],
            'recordChangedByUuid' => $requestData['data']['recordChangedByUuid'],
            'recordChangedFromIPAddress' => $recordChangedFromIPAddress,
        );
       
        $goal = Goal::insertGetId($goalData);

        return response()->json($goal, 201);
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