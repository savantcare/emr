<?php

namespace App\Http\Controllers;

use App\Reminder;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use DB;

class ReminderController extends Controller
{

    public function showAllReminders()
    {
        $remQuery = DB::select(DB::raw('SELECT *,UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM rems FOR SYSTEM_TIME ALL order by ROW_START desc'));
        return response()->json($remQuery);
        // return response()->json(Reminder::all());
    }

    public function showOneReminder($id)
    {
        return response()->json(Reminder::find($id));
    }

    public function create(Request $request)
    {
        $requestData = $request->all();
        $uuid = Uuid::uuid4();

        $remData = array(
            'uuid' => $uuid,
            'ptUUID' => $requestData['data']['ptUUID'],
            'description' => $requestData['data']['description'],
            'recordChangedByUUID' => $requestData['data']['recordChangedByUUID']
        );
       
        $Reminder = Reminder::insertGetId($remData);
        // $Reminder = Reminder::create($request->all());
        return response()->json($Reminder, 201);
    }

    public function update($id, Request $request)
    {
        $Reminder = Reminder::findOrFail($id);
        $Reminder->update($request->all());

        return response()->json($Reminder, 200);
    }

    public function delete($id)
    {
        Reminder::findOrFail($id)->delete();
        return response('Deleted Successfully', 200);
    }

    public function discontinue($id, Request $request)
    {
        $Reminder = Reminder::findOrFail($id);
        $requestData = $request->all();

        if(isset($requestData['dNotes']) && !empty($requestData['dNotes']))
        {
            $updateData = array(
                'notes' => $requestData['dNotes']
            );
            $Reminder->update($updateData);
        }

        $Reminder->delete();
        return response('Discontinued successfully', 200);
    }
}